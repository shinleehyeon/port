#!/usr/bin/env node
import { Octokit } from "@octokit/rest";
import chalk from "chalk";
import { execSync } from "child_process";
import inquirer from "inquirer";

// 1. Core Abstractions
const Effect = {
  of: (x) => () => Promise.resolve(x),
  fail: (e) => () => Promise.reject(e),
  chain: (f) => (effect) => async () => {
    const value = await effect();
    return f(value)();
  },
  map: (f) => (effect) => async () => {
    const value = await effect();
    return f(value);
  },
  catch: (f) => (effect) => async () => {
    try {
      return await effect();
    } catch (error) {
      return f(error)();
    }
  },
  run: async (effect) => await effect(),
};

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

// 2. Configuration
const CONFIG = {
  presets: [
    {
      label: "✨ 새로운 기능 추가",
      icon: "✨",
      task: "feat",
      ghLabel: "feature",
    },
    { label: "🐛 버그 수정", icon: "🐛", task: "fix", ghLabel: "bugfix" },
    { label: "🎨 UI/스타일 변경", icon: "🎨", task: "style", ghLabel: "ui" },
    {
      label: "♻️  리팩토링",
      icon: "♻️",
      task: "refactor",
      ghLabel: "refactor",
    },
    { label: "⚡ 성능 개선", icon: "⚡", task: "perf", ghLabel: "performance" },
    { label: "📝 문서 작업", icon: "📝", task: "docs", ghLabel: "docs" },
    { label: "🧪 테스트 추가", icon: "🧪", task: "test", ghLabel: "test" },
    { label: "🔧 기타 작업", icon: "🔧", task: "chore", ghLabel: "chore" },
    { label: "🗑️  코드 제거", icon: "🗑️", task: "prune", ghLabel: "cleanup" },
    {
      label: "⏪ 코드 되돌리기",
      icon: "⏪",
      task: "revert",
      ghLabel: "revert",
    },
  ],
  branches: {
    main: "main",
  },
  pr: {
    templates: {
      feature: (commits) =>
        [
          "## 무엇을 작업했나요",
          "---무엇을 작업했는지 적어주세요---",
          "",
          "## 어떤 방식으로 작업했나요?",
          "---어떤 방식으로 작업했는지 적어주세요---",
          "",
          "## 구현 뷰",
          "---이미지를 첨부해주세요---",
          "",
          commits.length > 0
            ? `## 커밋 내역\n${commits.map((c) => `- ${c}`).join("\n")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
    },
  },
};

// 3. Infrastructure
const createGitClient = () => {
  const execGit = (cmd) => execSync(cmd).toString().trim();
  const execGitSilent = (cmd) => {
    execSync(cmd, { stdio: "ignore" });
  };
  return {
    getCurrentBranch: () => execGit("git rev-parse --abbrev-ref HEAD"),
    getRepoInfo: () => {
      const remoteUrl = execGit("git config --get remote.origin.url");
      const [owner, repo] = remoteUrl
        .match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/i)
        .slice(1);
      return { owner, repo };
    },
    getCommitMessages: (base, head) => {
      try {
        const log = execGit(`git log ${base}..${head} --pretty=format:"%s"`);
        return log ? log.split("\n").map((s) => s.replace(/^"|"$/g, "")) : [];
      } catch {
        return [];
      }
    },
    getLastCommitMessage: () => {
      const message = execGit("git log -1 --pretty=%B").split("\n")[0];
      return message.replace(
        /^(feat|fix|style|revert|refactor|chore|prune|docs|perf|test):\s*/,
        "",
      );
    },
    getLocalCommitHash: () => execGit("git rev-parse HEAD"),
    checkRemoteBranchExists: (branch) => {
      try {
        execGit(`git ls-remote --heads origin ${branch}`);
        return true;
      } catch {
        return false;
      }
    },
    getRemoteCommitHash: (branch) => {
      try {
        return execGit(`git rev-parse origin/${branch}`);
      } catch {
        return null;
      }
    },
    pushWithProgress: async (branch, isUpdate = false) => {
      const message = isUpdate
        ? "remote에 최신 커밋 push하는 중"
        : "remote로 push하는 중";
      for (let i = 0; i <= 100; i += 10) {
        process.stdout.write(`\r${message}(${i}%)`);
        if (i < 100) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      process.stdout.write("\n");
      try {
        execGitSilent(`git push -u origin ${branch}`);
        process.stdout.write("\n");
      } catch {
        process.stdout.write("\n");
        throw new Error(`브랜치 '${branch}'를 push하는 데 실패했어요.`);
      }
    },
  };
};

const createGitHubClient = (token) => {
  const octokit = new Octokit({ auth: token });
  const git = createGitClient();
  const { owner, repo } = git.getRepoInfo();
  return {
    owner,
    repo,
    octokit,
    findOpenPullRequest: async (base, head) => {
      const { data: pulls } = await octokit.pulls.list({
        owner,
        repo,
        state: "open",
        base,
        head: `${owner}:${head}`,
      });
      return pulls[0];
    },
    createPullRequest: async ({ title, head, base, body, draft = true }) => {
      return octokit.pulls.create({
        owner,
        repo,
        title,
        head: `${owner}:${head}`,
        base,
        body,
        draft,
      });
    },
    addLabels: async (prNumber, labels) => {
      try {
        await octokit.issues.addLabels({
          owner,
          repo,
          issue_number: prNumber,
          labels,
        });
      } catch {
        // 라벨이 없으면 무시
      }
    },
    addAssignees: async (prNumber) => {
      try {
        const { data: user } = await octokit.users.getAuthenticated();
        await octokit.issues.addAssignees({
          owner,
          repo,
          issue_number: prNumber,
          assignees: [user.login],
        });
      } catch {
        // assign 실패 시 무시
      }
    },
  };
};

const openInBrowser = (url) => {
  const cmd =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "start"
        : "xdg-open";
  try {
    execSync(`${cmd} ${url}`, { stdio: "ignore" });
  } catch {
    // 브라우저 열기 실패 시 무시
  }
};

const getHelpMessage = () => `사용법: yarn pr [옵션]
옵션:
  --ready, -r    Draft PR이 아닌 일반 PR로 생성해요.
  --help, -h     도움말을 표시해요.
예시:
  yarn pr          # Draft PR로 생성
  yarn pr --ready  # 일반 PR로 생성
  yarn pr -r       # 일반 PR로 생성 (축약형)`;

const parseOptions = (args = process.argv.slice(2)) => ({
  skipDraft: args.includes("--ready") || args.includes("-r"),
  showHelp: args.includes("--help") || args.includes("-h"),
});

const createContext = (github) => ({
  github,
  currentBranch: createGitClient().getCurrentBranch(),
  skipDraft: parseOptions().skipDraft,
});

const validateEnvironment = (token) =>
  token
    ? Effect.of(token)
    : Effect.fail(new Error("GITHUB_TOKEN 환경변수가 설정되어 있지 않아요."));

// 4. Domain Logic
const collectIntentions = async () => {
  const lastCommitMessage = createGitClient().getLastCommitMessage();
  const { preset } = await inquirer.prompt([
    {
      type: "select",
      name: "preset",
      message: "어떤 작업인가요?",
      choices: CONFIG.presets.map((p) => ({
        name: p.label,
        value: p,
      })),
    },
  ]);
  const { description } = await inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: "작업 내용을 설명해요. 미입력시 마지막 커밋 메시지를 사용해요.",
      default: lastCommitMessage,
      validate: (input) =>
        input.trim().length === 0 ? "설명을 입력해주세요." : true,
    },
  ]);
  return {
    icon: preset.icon,
    task: preset.task,
    ghLabel: preset.ghLabel,
    description,
  };
};

const formatPRTitle = ({ icon, task, description }) => {
  return `${icon} ${task}: ${description}`;
};

const checkExistingPR = async (github, context) => {
  const { currentBranch } = context;
  const existingPR = await github.findOpenPullRequest(
    CONFIG.branches.main,
    currentBranch,
  );
  return existingPR;
};

const handleExistingPR = (existingPR) => {
  console.log(
    chalk.yellowBright(
      `PR(${existingPR.head.ref} → ${existingPR.base.ref})이 이미 존재해요`,
    ),
  );
  console.log(chalk.whiteBright(`PR 링크: ${existingPR.html_url}`));
  openInBrowser(existingPR.html_url);
};

const createFeaturePR = async (github, context) => {
  const { currentBranch, skipDraft } = context;
  const git = createGitClient();
  const remoteBranchExists = git.checkRemoteBranchExists(currentBranch);
  const localCommitHash = git.getLocalCommitHash();
  const remoteCommitHash = git.getRemoteCommitHash(currentBranch);
  if (!remoteBranchExists) {
    await git.pushWithProgress(currentBranch, false);
  } else if (localCommitHash !== remoteCommitHash) {
    await git.pushWithProgress(currentBranch, true);
  }
  const intentions = await collectIntentions();
  const title = formatPRTitle(intentions);
  const commits = git.getCommitMessages(
    `origin/${CONFIG.branches.main}`,
    "HEAD",
  );
  const body = CONFIG.pr.templates.feature(commits);
  const result = await github.createPullRequest({
    title,
    head: currentBranch,
    base: CONFIG.branches.main,
    body,
    draft: !skipDraft,
  });

  const prNumber = result.data.number;
  await Promise.all([
    github.addLabels(prNumber, [intentions.ghLabel]),
    github.addAssignees(prNumber),
  ]);

  return result;
};

const createPullRequest = (github) => async (context) => {
  const existingPR = await checkExistingPR(github, context);
  if (existingPR) {
    return handleExistingPR(existingPR);
  }
  return createFeaturePR(github, context);
};

// 5. Main Program
const executeWorkflow = async (context) => {
  if (parseOptions().showHelp) {
    console.log(getHelpMessage());
    return;
  }
  const currentBranch = context.currentBranch;
  if (currentBranch === CONFIG.branches.main) {
    console.log(chalk.red("main 브랜치에서는 실행할 수 없어요."));
    process.exit(1);
  }
  const github = createGitHubClient(process.env.GITHUB_TOKEN);
  try {
    const result = await createPullRequest(github)(context);
    if (result) {
      const prUrl = result.data.html_url;
      console.log(chalk.green("PR이 성공적으로 생성되었어요."));
      console.log(chalk.whiteBright(`PR 링크: ${prUrl}`));
      openInBrowser(prUrl);
    }
  } catch (error) {
    throw new Error(`PR 생성 실패: ${error.message}`);
  }
};

const handleError = (error) => {
  console.error(chalk.red("작업 중단:"), error.message);
  return process.exit(1);
};

const withGithub = (token) => Effect.of(createGitHubClient(token));
const withContext = (github) => Effect.of(createContext(github));
const withWorkflow = (github) => Effect.of(executeWorkflow(github));
const createPRWorkflow = pipe(
  validateEnvironment,
  Effect.chain(withGithub),
  Effect.chain(withContext),
  Effect.chain(withWorkflow),
);

const main = async () => {
  try {
    await Effect.run(createPRWorkflow(process.env.GITHUB_TOKEN));
  } catch (error) {
    handleError(error);
  }
};

main();
