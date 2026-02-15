#!/usr/bin/env node
ㄱimport { Octokit } from "@octokit/rest";
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
  labels: [
    { value: "✨feature", label: "✨feature     기능 추가/개선" },
    { value: "🎨ui", label: "🎨ui          UI/스타일" },
    { value: "🐛fix", label: "🐛fix         버그 수정" },
    { value: "♻️refactor", label: "♻️refactor    리팩토링" },
    { value: "📝docs", label: "📝docs        문서" },
    { value: "⚡perf", label: "⚡perf        성능 개선" },
    { value: "🧪test", label: "🧪test        테스트" },
    { value: "🔧chore", label: "🔧chore       기타" },
  ],
  tasks: [
    { value: "feat", label: "feat                새로운 기능" },
    { value: "fix", label: "fix                 버그 수정" },
    { value: "style", label: "style               UI/UX 수정" },
    { value: "revert", label: "revert              코드 되돌리기" },
    { value: "refactor", label: "refactor            코드 리팩토링" },
    { value: "chore", label: "chore               기타 작업" },
    { value: "docs", label: "docs                문서 관련" },
    { value: "prune", label: "prune               코드 제거" },
    { value: "perf", label: "perf                성능 개선" },
    { value: "test", label: "test                테스트 코드" },
  ],
  branches: {
    main: "main",
    develop: "develop",
  },
  pr: {
    templates: {
      feature: () =>
        [
          "## 무엇을 작업했나요",
          "<!-- 작업 내용을 요약하여 적어주세요 -->\n\n",
          "## 어떤 방식으로 작업했나요?",
          "<!-- 작업한 내용에 대한 설명을 적어주세요 -->\n\n",
          "## 구현 뷰",
          "<!-- 이미지 -->\n\n",
        ].join("\n"),
      release: (commits) =>
        commits
          .map(formatCommitMessage)
          .map((commit) => `- ${commit}`)
          .join("\n"),
    },
    titles: {
      release: "Release",
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
    getDiffBetweenBranches: (base, head) =>
      execGit(`git log ${base}..${head} --pretty=format:"%s"`),
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
    compareCommits: async (base, head) => {
      const {
        data: { commits },
      } = await octokit.repos.compareCommits({
        owner,
        repo,
        base,
        head,
      });
      return commits;
    },
  };
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
  isDevelop: createGitClient().getCurrentBranch() === CONFIG.branches.develop,
  skipDraft: parseOptions().skipDraft,
});

const validateEnvironment = (token) =>
  token
    ? Effect.of(token)
    : Effect.fail(new Error("GITHUB_TOKEN 환경변수가 설정되어 있지 않아요."));

// 4. Domain Logic
const collectIntentions = async () => {
  const lastCommitMessage = createGitClient().getLastCommitMessage();
  const { label } = await inquirer.prompt([
    {
      type: "list",
      name: "label",
      message: "어떤 종류의 작업인가요?",
      choices: CONFIG.labels.map((l) => ({
        name: l.label,
        value: l.value,
      })),
    },
  ]);
  const { task } = await inquirer.prompt([
    {
      type: "list",
      name: "task",
      message: "작업의 종류는 무엇인가요?",
      choices: CONFIG.tasks.map((t) => ({
        name: t.label,
        value: t.value,
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
  return { label, task: task.split(" ")[0], description };
};

const formatPRTitle = (branch, { task, label, description }) => {
  return `${task}: [${label}] ${description}`;
};

const checkExistingPR = async (github, context) => {
  const { currentBranch, isDevelop } = context;
  const existingPR = await github.findOpenPullRequest(
    isDevelop ? CONFIG.branches.main : CONFIG.branches.develop,
    currentBranch,
  );
  return existingPR;
};

const handleExistingPR = (existingPR) => {
  console.log(
    chalk.yellowBright(
      `PR(${existingPR.head.ref} → ${existingPR.base.ref})이 이미 존재해요👀`,
    ),
  );
  console.log(chalk.whiteBright(`PR 링크🔗: ${existingPR.html_url}`));
};

const formatCommitMessage = (commit) => {
  return commit.commit.message.split("\n")[0];
};

const createReleasePR = async (github) => {
  const commits = await github.compareCommits(
    CONFIG.branches.main,
    CONFIG.branches.develop,
  );
  if (commits.length === 0) {
    console.log(chalk.red("현재 main 브랜치와 develop 브랜치가 동일해요."));
    return;
  }
  return github.createPullRequest({
    title: CONFIG.pr.titles.release,
    head: CONFIG.branches.develop,
    base: CONFIG.branches.main,
    body: CONFIG.pr.templates.release(commits),
    draft: false,
  });
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
  const title = formatPRTitle(currentBranch, intentions);
  const body = CONFIG.pr.templates.feature();
  return github.createPullRequest({
    title,
    head: currentBranch,
    base: CONFIG.branches.main,
    body,
    draft: !skipDraft,
  });
};

const createPullRequest = (github) => async (context) => {
  const { isDevelop } = context;
  const existingPR = await checkExistingPR(github, context);
  if (existingPR) {
    return handleExistingPR(existingPR);
  }
  return isDevelop ? createReleasePR(github) : createFeaturePR(github, context);
};

// 5. Main Program
const executeWorkflow = async (context) => {
  if (parseOptions().showHelp) {
    console.log(getHelpMessage());
    return;
  }
  const currentBranch = context.currentBranch;
  if (
    currentBranch === CONFIG.branches.main ||
    currentBranch === CONFIG.branches.develop
  ) {
    console.log(chalk.red("develop이나 main 브랜치에서는 실행할 수 없어요."));
    process.exit(1);
  }
  const github = createGitHubClient(process.env.GITHUB_TOKEN);
  try {
    const result = await createPullRequest(github)(context);
    if (result) {
      console.log(chalk.green("PR이 성공적으로 생성되었어요."));
      console.log(chalk.whiteBright(`PR 링크🔗: ${result.data.html_url}`));
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
