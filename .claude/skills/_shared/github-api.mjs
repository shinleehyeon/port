#!/usr/bin/env node

/**
 * GitHub API 유틸리티
 * gh CLI 없이 GitHub REST API를 직접 호출합니다.
 */

import { execSync } from 'child_process';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * GitHub 토큰 조회
 * 환경변수 GITHUB_TOKEN 또는 GITHUB_REGISTRY_TOKEN 사용
 */
export function getGitHubToken() {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_REGISTRY_TOKEN;
  if (!token) {
    throw new Error(
      'GitHub 토큰이 필요합니다. GITHUB_TOKEN 또는 GITHUB_REGISTRY_TOKEN 환경변수를 설정해주세요.'
    );
  }
  return token;
}

/**
 * git 명령어 실행
 */
function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch {
    return null;
  }
}

/**
 * GitHub API 호출
 */
export async function githubApi(endpoint, options = {}) {
  const token = getGitHubToken();
  const url = endpoint.startsWith('http') ? endpoint : `${GITHUB_API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API 오류 (${response.status}): ${error}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

/**
 * git remote에서 owner/repo 추출
 */
export function getRepoInfo() {
  const remoteUrl = runGit('git remote get-url origin');
  if (!remoteUrl) {
    throw new Error('git remote origin을 찾을 수 없습니다.');
  }

  // https://github.com/owner/repo.git 또는 git@github.com:owner/repo.git 형태
  const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (!match) {
    throw new Error(`GitHub URL 파싱 실패: ${remoteUrl}`);
  }

  return {
    owner: match[1],
    repo: match[2],
    fullName: `${match[1]}/${match[2]}`,
  };
}

/**
 * 현재 브랜치명 조회
 */
export function getCurrentBranch() {
  const branch = runGit('git branch --show-current');
  if (!branch) {
    throw new Error('현재 브랜치를 찾을 수 없습니다.');
  }
  return branch;
}

/**
 * 현재 브랜치의 PR 조회
 */
export async function getCurrentPR() {
  const { owner, repo } = getRepoInfo();
  const branch = getCurrentBranch();

  const prs = await githubApi(`/repos/${owner}/${repo}/pulls?head=${owner}:${branch}&state=open`);

  if (!prs || prs.length === 0) {
    return null;
  }

  const pr = prs[0];
  return {
    number: pr.number,
    title: pr.title,
    url: pr.html_url,
    state: pr.state,
    baseRefName: pr.base.ref,
    headRefName: pr.head.ref,
    headRefOid: pr.head.sha,
  };
}

/**
 * PR 파일 목록 조회
 */
export async function getPRFiles(prNumber) {
  const { owner, repo } = getRepoInfo();
  const files = await githubApi(`/repos/${owner}/${repo}/pulls/${prNumber}/files`);

  return files.map((file) => ({
    path: file.filename,
    additions: file.additions,
    deletions: file.deletions,
    status: file.status,
    patch: file.patch,
  }));
}

/**
 * PR diff 조회 (파일 patch를 조합)
 */
export async function getPRDiff(prNumber) {
  const files = await getPRFiles(prNumber);

  const diffParts = files
    .filter((file) => file.patch)
    .map((file) => {
      return `diff --git a/${file.path} b/${file.path}\n${file.patch}`;
    });

  return diffParts.join('\n\n');
}

/**
 * PR 리뷰 코멘트 목록 조회
 */
export async function getPRReviewComments(prNumber) {
  const { owner, repo } = getRepoInfo();
  const comments = await githubApi(`/repos/${owner}/${repo}/pulls/${prNumber}/comments`);

  return comments.map((c) => ({
    id: c.id,
    path: c.path,
    line: c.line || c.original_line,
    body: c.body,
    inReplyToId: c.in_reply_to_id,
    user: c.user.login,
  }));
}

/**
 * PR 리뷰 목록 조회
 */
export async function getPRReviews(prNumber) {
  const { owner, repo } = getRepoInfo();
  const reviews = await githubApi(`/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);

  return reviews.map((r) => ({
    id: r.id,
    state: r.state,
    body: r.body,
    user: r.user.login,
  }));
}

/**
 * PR에 라인 코멘트 추가
 */
export async function postPRLineComment(prNumber, { path, line, body, commitId }) {
  const { owner, repo } = getRepoInfo();

  return githubApi(`/repos/${owner}/${repo}/pulls/${prNumber}/comments`, {
    method: 'POST',
    body: {
      body,
      commit_id: commitId,
      path,
      line,
      side: 'RIGHT',
    },
  });
}

/**
 * PR 리뷰 코멘트에 답글 추가
 */
export async function replyToPRComment(prNumber, commentId, body) {
  const { owner, repo } = getRepoInfo();

  return githubApi(`/repos/${owner}/${repo}/pulls/${prNumber}/comments/${commentId}/replies`, {
    method: 'POST',
    body: { body },
  });
}

/**
 * PR 리뷰 제출
 */
export async function submitPRReview(prNumber, { event, body }) {
  const { owner, repo } = getRepoInfo();

  return githubApi(`/repos/${owner}/${repo}/pulls/${prNumber}/reviews`, {
    method: 'POST',
    body: {
      body,
      event, // COMMENT, APPROVE, REQUEST_CHANGES
    },
  });
}