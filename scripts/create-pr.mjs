#!/usr/bin/env node
import { Octokit } from "@octokit/rest";
import chalk from "chalk";
import { execSync } from "child_process";
import inquirer from "inquirer";

const PR_TYPES = [
  { label: "✨ 새로운 기능 추가", icon: "✨", prefix: "feat", tag: "feature" },
  { label: "🐛 버그 수정", icon: "🐛", prefix: "fix", tag: "bugfix" },
  { label: "🎨 UI/스타일 변경", icon: "🎨", prefix: "style", tag: "ui" },
  { label: "♻️  리팩토링", icon: "♻️", prefix: "refactor", tag: "refactor" },
  { label: "⚡ 성능 개선", icon: "⚡", prefix: "perf", tag: "performance" },
  { label: "📝 문서 작업", icon: "📝", prefix: "docs", tag: "docs" },
  { label: "🧪 테스트 추가", icon: "🧪", prefix: "test", tag: "test" },
  { label: "🔧 기타 작업", icon: "🔧", prefix: "chore", tag: "chore" },
  { label: "🗑️  코드 제거", icon: "🗑️", prefix: "prune", tag: "cleanup" },
  { label: "⏪ 코드 되돌리기", icon: "⏪", prefix: "revert", tag: "revert" },
];

const BASE_BRANCH = "main";

// --- Git 명령 유틸 ---

function run(cmd) {
  return execSync(cmd).toString().trim();
}

function runSilent(cmd) {
  execSync(cmd, { stdio: "ignore" });
}

// --- PR 본문 생성 ---

function buildPRBody(commits) {
  const lines = [
    "### 🙌 요약",
    "- 이 PR에서 주요 변경 사항:",
    "  - …",
    "",
    "### 💡 작업 배경",
    "- …",
    "",
    "### 🧐 수정한 UI",
    "| Before | After |",
    "| :---: | :---: |",
    "| 스크린샷 붙여넣기 | 스크린샷 붙여넣기 |",
    "",
    "### ✏️ 제안 사항 (선택)",
    "- …",
    "",
    "### ✅ 리뷰 결론",
    "- [ ] 단순 의견 공유 (머지 여부에 영향 없음)",
    "- [ ] 사소한 수정 후 머지 가능",
    "- [ ] 추가 수정 필요 (변경 요청)",
  ];

  if (commits.length > 0) {
    lines.push("", "### 📋 커밋 내역");
    for (const msg of commits) {
      lines.push(`- ${msg}`);
    }
  }

  return lines.join("\n");
}

// --- PRCreator 클래스 ---

class PRCreator {
  constructor(token) {
    if (!token) {
      throw new Error("GITHUB_TOKEN 환경변수가 설정되어 있지 않아요.");
    }
    this.octokit = new Octokit({ auth: token });
    this.branch = run("git rev-parse --abbrev-ref HEAD");
    this._loadRepoInfo();
  }

  _loadRepoInfo() {
    const url = run("git config --get remote.origin.url");
    const match = url.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/i);
    if (!match) throw new Error("GitHub remote URL을 파싱할 수 없어요.");
    [, this.owner, this.repo] = match;
  }

  // --- Git ---

  get lastCommitSummary() {
    const msg = run("git log -1 --pretty=%B").split("\n")[0];
    return msg.replace(
      /^(feat|fix|style|revert|refactor|chore|prune|docs|perf|test):\s*/,
      "",
    );
  }

  get localHash() {
    return run("git rev-parse HEAD");
  }

  remoteHash(branch) {
    try {
      return run(`git rev-parse origin/${branch}`);
    } catch {
      return null;
    }
  }

  hasRemoteBranch(branch) {
    try {
      const result = run(`git ls-remote --heads origin ${branch}`);
      return result.length > 0;
    } catch {
      return false;
    }
  }

  commitsBetween(base, head) {
    try {
      const log = run(`git log ${base}..${head} --pretty=format:"%s"`);
      return log ? log.split("\n").map((s) => s.replace(/^"|"$/g, "")) : [];
    } catch {
      return [];
    }
  }

  async syncRemote() {
    const exists = this.hasRemoteBranch(this.branch);
    const needsPush =
      !exists || this.localHash !== this.remoteHash(this.branch);

    if (!needsPush) return;

    const label = exists ? "최신 커밋 동기화 중" : "브랜치 push 중";
    process.stdout.write(chalk.dim(`${label}...`));

    try {
      runSilent(`git push -u origin ${this.branch}`);
      process.stdout.write(chalk.green(" 완료\n"));
    } catch {
      process.stdout.write(chalk.red(" 실패\n"));
      throw new Error(`브랜치 '${this.branch}' push에 실패했어요.`);
    }
  }

  // --- GitHub API ---

  async findExistingPR() {
    const { data: pulls } = await this.octokit.pulls.list({
      owner: this.owner,
      repo: this.repo,
      state: "open",
      base: BASE_BRANCH,
      head: `${this.owner}:${this.branch}`,
    });
    return pulls[0] ?? null;
  }

  async submitPR({ title, body, draft }) {
    const { data } = await this.octokit.pulls.create({
      owner: this.owner,
      repo: this.repo,
      title,
      head: `${this.owner}:${this.branch}`,
      base: BASE_BRANCH,
      body,
      draft,
    });
    return data;
  }

  async applyLabel(prNumber, label) {
    try {
      await this.octokit.issues.addLabels({
        owner: this.owner,
        repo: this.repo,
        issue_number: prNumber,
        labels: [label],
      });
    } catch {
      // 라벨 없으면 무시
    }
  }

  async assignSelf(prNumber) {
    try {
      const { data: me } = await this.octokit.users.getAuthenticated();
      await this.octokit.issues.addAssignees({
        owner: this.owner,
        repo: this.repo,
        issue_number: prNumber,
        assignees: [me.login],
      });
    } catch {
      // 실패 시 무시
    }
  }

  // --- 인터랙션 ---

  async askPRType() {
    const { selected } = await inquirer.prompt([
      {
        type: "select",
        name: "selected",
        message: "어떤 작업인가요?",
        choices: PR_TYPES.map((t) => ({ name: t.label, value: t })),
      },
    ]);
    return selected;
  }

  async askDescription() {
    const { desc } = await inquirer.prompt([
      {
        type: "input",
        name: "desc",
        message: "작업 내용을 입력하세요 (비우면 최근 커밋 메시지 사용):",
        default: this.lastCommitSummary,
        validate: (v) => (v.trim() ? true : "설명을 입력해주세요."),
      },
    ]);
    return desc;
  }

  // --- 메인 플로우 ---

  async run(options) {
    if (options.help) {
      console.log(HELP_TEXT);
      return;
    }

    if (this.branch === BASE_BRANCH) {
      console.log(chalk.red(`${BASE_BRANCH} 브랜치에서는 실행할 수 없어요.`));
      process.exit(1);
    }

    const existing = await this.findExistingPR();
    if (existing) {
      console.log(
        chalk.yellow(
          `이미 열린 PR이 있어요: ${existing.head.ref} → ${existing.base.ref}`,
        ),
      );
      console.log(chalk.white(`  ${existing.html_url}`));
      openURL(existing.html_url);
      return;
    }

    await this.syncRemote();

    const prType = await this.askPRType();
    const description = await this.askDescription();
    const title = `${prType.icon} ${prType.prefix}: ${description}`;
    const commits = this.commitsBetween(`origin/${BASE_BRANCH}`, "HEAD");
    const body = buildPRBody(commits);

    const pr = await this.submitPR({
      title,
      body,
      draft: !options.ready,
    });

    await Promise.all([
      this.applyLabel(pr.number, prType.tag),
      this.assignSelf(pr.number),
    ]);

    console.log(chalk.green("PR 생성 완료!"));
    console.log(chalk.white(`  ${pr.html_url}`));
    openURL(pr.html_url);
  }
}

// --- 헬퍼 ---

const HELP_TEXT = `사용법: yarn pr [옵션]

옵션:
  --ready, -r    일반 PR로 생성 (기본: Draft)
  --help, -h     도움말 표시

예시:
  yarn pr          # Draft PR 생성
  yarn pr --ready  # 일반 PR 생성`;

function openURL(url) {
  const cmd =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "start"
        : "xdg-open";
  try {
    execSync(`${cmd} ${url}`, { stdio: "ignore" });
  } catch {
    // 무시
  }
}

function parseArgs(argv = process.argv.slice(2)) {
  return {
    ready: argv.includes("--ready") || argv.includes("-r"),
    help: argv.includes("--help") || argv.includes("-h"),
  };
}

// --- 실행 ---

const args = parseArgs();

if (args.help) {
  console.log(HELP_TEXT);
} else {
  try {
    const creator = new PRCreator(process.env.GITHUB_TOKEN);
    await creator.run(args);
  } catch (err) {
    console.error(chalk.red("오류:"), err.message);
    process.exit(1);
  }
}
