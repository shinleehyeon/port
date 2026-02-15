---
name: self-review
description: |
  열린 PR에 셀프 리뷰를 남깁니다.
  Triggers on: "/self-review", "셀프 리뷰", "셀프리뷰"
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Self Review - 셀프 리뷰

리뷰어를 위해 PR의 핵심 변경사항과 결정 배경을 공유하고, 고민이 필요한 부분에 대해 의견을 구합니다.

## 셀프 리뷰의 목적

셀프 리뷰는 **리뷰어와의 소통**입니다:

- **핵심 변경사항 설명** - 무엇을 왜 바꿨는지 공유
- **결정 배경 공유** - 이렇게 결정한 이유 설명
- **이견이 갈릴 수 있는 부분 표시** - 일관적이지 않거나 논쟁의 여지가 있는 시도
- **복잡성에 대한 고민** - 더 좋은 코드를 위해 복잡성을 감수한 이유
- **더 좋은 방법 질문** - 확신이 없을 때 대안 요청
- **문제/비효율성 고민 공유** - 알고 있는 한계점이나 트레이드오프

## Workflow

### Step 1: PR 변경사항 확인

```bash
node .claude/skills/self-review/scripts/get-pr-diff.mjs
```

변경된 파일 목록과 diff를 가져옵니다.

### Step 2: 변경사항 분석

변경된 파일들을 읽고 두 가지 관점에서 분석합니다.

#### A. 품질 검사 (문제 발견 시 직접 수정)

| 분류 | 체크 항목 |
|------|----------|
| **오타** | 이벤트명, 변수명 오타 확인 |
| **버그** | 널 체크 누락, 타입 에러 가능성, 로직 오류 |
| **보안** | 개인정보 이벤트 로깅, 권한 없는 유저의 정보/페이지 접근 |
| **성능** | 불필요한 리렌더링. 단, 오버엔지니어링 지양, 과도한 훅 사용 지양 |
| **코드 구조** | 상수는 `constants/`, 페이지 외부 타입은 `types/`에서 관리 |
| **Relay** | 맥락상 required 필드는 `required(action: THROW)` 사용. optional chaining으로 타입만 해결 ❌, 렌더링 준비계층에서 type check 후 redirect/throw ✅ |
| **선언적 코드** | useEffect 최소화. 반복 코드는 util(다양한 활용) 또는 relay resolver(서버 상태 가공)로 분리. `@docs/es-toolkit.md`나 ts-pattern으로 더 선언적/가독적이 될 부분 체크 |
| **이벤트** | 클릭/조회 이벤트 누락 확인. 단, mutation 핸들러는 성공 시 자동 로깅되므로 OK, 네비게이션은 다음 페이지 조회 이벤트의 진입점으로 확인 가능하므로 OK. 그 외 버튼 클릭, 새 페이지/섹션 노출 등은 이벤트 필요. **파라미터**: 리소스 ID는 Node ID가 아닌 DB ID(`_id` 필드) 사용, 클라이언트에서만 알 수 있는 스냅샷 데이터(피드 위치, 필터 상태, 시점별 값 등) 포함 여부 확인. **섹션 구분**: 같은 페이지에서 동일 성격 이벤트가 여러 곳에 있으면 `PageCodeInfoProvider`로 section code 내려서 구분. **pageContext**: 필터 등 state에 의해 variant가 생기는 경우, 설정된 필터들을 join(',')해서 pageContext로 내려 분석에 활용 (항상 쓰지는 않음) |

⚠️ 문제 발견 시 셀프 리뷰가 아니라 **직접 수정** 후 커밋

#### 검증

```bash
yarn check-types && yarn lint
```

수정 후 타입 체크와 린트 통과 확인

#### B. 리뷰어 소통 (코멘트로 공유)

| 관점 | 질문 |
|------|------|
| **핵심 변경** | 이 PR의 가장 중요한 변경은 무엇인가? |
| **결정 배경** | 왜 이 방식을 선택했는가? 다른 대안은? |
| **복잡성** | 복잡해진 부분이 있다면 그 이유는? |
| **일관성** | 기존 패턴과 다른 부분이 있는가? |
| **트레이드오프** | 감수한 단점이나 한계는? |

### Step 3: 라인별 코멘트 작성

설명이 필요한 코드에 직접 코멘트:

```bash
node .claude/skills/self-review/scripts/post-line-comment.mjs <file-path> <line> "<message>"
```

**예시 (결정 배경 설명):**
```bash
node .claude/skills/self-review/scripts/post-line-comment.mjs src/hooks/useData.ts 42 "useMemo 대신 일반 변수를 사용했어요. 이 연산이 가볍고 deps가 자주 바뀌어서 메모이제이션 오버헤드가 더 클 것 같았는데, 어떻게 생각하세요?"
```

**예시 (이견 가능한 부분):**
```bash
node .claude/skills/self-review/scripts/post-line-comment.mjs src/components/Modal.tsx 78 "기존 패턴과 다르게 상태를 부모로 올렸어요. 재사용성을 위해서인데, 기존 방식을 유지하는 게 나을까요?"
```

**예시 (고민 공유):**
```bash
node .claude/skills/self-review/scripts/post-line-comment.mjs src/pages/DetailPage.tsx 120 "이 로직이 좀 복잡해졌는데, 더 깔끔한 방법이 있을까요?"
```

### Step 4: 전체 리뷰 작성 (선택)

PR 전체에 대한 코멘트가 필요할 때:

```bash
node .claude/skills/self-review/scripts/post-review.mjs COMMENT "<body>"
```

긴 리뷰는 파일로:
```bash
node .claude/skills/self-review/scripts/post-review.mjs COMMENT @review-body.md
```

## 코멘트 톤

친근하고 다정한 "~요" 문체를 사용합니다:
- ✅ "사용했어요", "해봤어요", "것 같아요", "어떨까요?"
- ❌ "사용했습니다", "해봤습니다", "것 같습니다", "어떨까요"

내용:
- ❌ "이렇게 했습니다" (통보)
- ✅ "이렇게 해봤는데, 어떻게 생각하세요?" (의견 요청)
- ✅ "~한 이유로 이 방식을 선택했는데, 더 좋은 방법이 있을까요?" (대안 질문)

의견을 구하는 질문형 코멘트에는 `@coderabbitai`를 태그해서 AI 리뷰어의 의견도 함께 받습니다:
- ✅ "이 방식이 더 나을 것 같은데, 어떻게 생각하세요? @coderabbitai"
- ❌ 단순 설명에는 태그 불필요

## 주의사항

- **품질 이슈는 직접 수정**: 버그, 타입 에러, 성능 문제 → 코멘트 ❌, 직접 수정 ✅
- **코멘트는 소통 목적**: 결정 배경, 고민, 대안 질문에만 사용
- **모든 코드에 코멘트 불필요**: 설명이 필요한 부분만
- **리뷰어 시간 절약**: 셀프 리뷰의 목적은 리뷰어가 빠르게 핵심을 파악하도록 돕는 것
