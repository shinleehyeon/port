---
name: load-memory
description: |
This skill should be used when the user wants to restore previous work progress in a new session.
  Triggers on: "/load-memory", "이전 작업 불러와줘", "어제 하던 거", "작업 이어서", or when starting a new session.
  Loads saved progress from Serena memory and restores the context.
---
# Load Memory Skill
저장된 작업 진행상황을 불러와 새 세션에서 이어서 작업할 수 있도록 한다.
## When to Use
- 새 세션 시작 시 이전 작업을 이어서 할 때
- /load-memory 명령 시
- "어제 하던 작업 이어서 해줘" 같은 요청 시
## Load Process
1. **메모리 확인**: mcp__serena__list_memories로 __work_progress__가 있는지 확인한다.
2. **메모리 읽기**: 있다면 mcp__serena__read_memory로 __work_progress__를 불러온다.
3. **브랜치 검증**: 저장된 브랜치와 현재 브랜치를 비교한다.
- 현재 브랜치 확인: git branch --show-current
- 저장된 Branch와 비교
- **일치 시**: 컨텍스트를 복원하고 남은 작업부터 안내
- **불일치 시**: "이전 작업(JOBL-XXX)과 다른 브랜치예요. 새로 시작할게요." 안내
4. **컨텍스트 복원**: 사용자에게 다음을 요약하여 알린다:
- 작업 중이던 이슈/기능
- 완료된 작업
- 남은 작업
- 주요 결정사항
## Example Usage
**저장된 진행상황이 있고 브랜치가 일치할 때:**

User: /load-memory
Claude: 이전 진행상황을 불러왔어요.
[JOBL-123 채팅 기능 구현]
- 브랜치: feat/JOBL-123
완료된 작업:
- [x] 채팅 UI 컴포넌트 구현
- [x] GraphQL 쿼리 작성
남은 작업:
- [ ] 실시간 메시지 구독 구현
- [ ] 에러 핸들링 추가
이어서 진행할까요?

**저장된 진행상황이 있지만 브랜치가 다를 때:**

User: /load-memory
Claude: 이전 작업(feat/JOBL-123)과 다른 브랜치(feat/JOBL-456)예요.
새로운 작업을 시작할게요. 무엇을 도와드릴까요?

**저장된 진행상황이 없을 때:**

User: /load-memory
Claude: 저장된 작업 진행상황이 없어요. 새로운 작업을 시작할게요.