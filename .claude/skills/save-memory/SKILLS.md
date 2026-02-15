---
name: save-memory
description: |
  This skill should be used when the user wants to save current work progress for later sessions.
  Triggers on: "/save-memory", "진행상황 저장해줘", "작업 저장", "기억해줘", or when finishing a work session.
  Saves completed tasks, remaining tasks, and key decisions to Serena memory for retrieval in new sessions.
---

# Save Memory Skill

현재 작업 진행상황을 저장하여 새 세션에서 이어서 작업할 수 있도록 한다.

## When to Use

- 작업 세션 종료 시
- 중요한 진행상황을 기록하고 싶을 때
- `/save-memory` 명령 시

## Save Process

1. **현재 상태 파악**: 대화 내용에서 다음을 추출한다:
   - 현재 git 브랜치 (`git branch --show-current`)
   - 작업 중인 기능/이슈 (Linear 이슈 번호 포함)
   - 완료된 작업 목록
   - 남은 작업 목록
   - 주요 결정사항
   - 참고할 파일 경로

2. **저장 형식**: 다음 형식으로 `__work_progress__` 메모리에 저장한다:

```markdown
# Work Progress

## Current Task
- **Branch**: feat/JOBL-XXX
- **Issue**: JOBL-XXX (있는 경우)
- **Description**: 작업 설명

## Completed
- [x] 완료된 작업 1
- [x] 완료된 작업 2

## Remaining
- [ ] 남은 작업 1
- [ ] 남은 작업 2

## Key Decisions
- 결정사항 1
- 결정사항 2

## Files
- `path/to/file1.tsx`: 설명
- `path/to/file2.ts`: 설명

## Notes
추가 메모
```

3. **저장 실행**: `mcp__serena__write_memory` 도구를 사용하여 저장한다.

4. **확인 메시지**: 저장된 내용을 요약하여 사용자에게 알린다.

## Example Usage

```
User: /save-memory
Claude: 진행상황을 저장할게요.

[저장 완료]
- 브랜치: feat/JOBL-123
- 현재 작업: JOBL-123 채팅 기능 구현
- 완료: 3개 작업
- 남음: 2개 작업

다음 세션에서 /load-memory로 이어서 작업할 수 있어요.
```
