---
name: figma-to-react
description: |
  Figma 디자인을 React 컴포넌트로 변환합니다. Figma REST API 사용 (MCP 불필요).
  Triggers on: "피그마 컴포넌트 만들어줘", "Figma URL로 컴포넌트 생성",
  "이 디자인 구현해줘", Figma URL이 포함된 컴포넌트 생성 요청.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---
# Figma to React Component Generator
## Workflow Overview

Phase 1: 구조 분석     → 레이아웃 트리 파악
Phase 2: 컴포넌트 매칭  → 기존 base/common 컴포넌트 확인
Phase 3: 스타일 추출   → 새로 만들 컴포넌트만 토큰 확인

---
## Phase 1: 구조 분석
Figma 디자인의 레이아웃 구조를 트리 형태로 파악합니다.
bash
.claude/skills/figma-to-react/scripts/analyze-structure.sh "<figma-url>"

**출력 예시:**

feed (INSTANCE)
├── Frame (FRAME, HORIZONTAL, gap:12)
│   ├── Info section (FRAME, VERTICAL, gap:4)
│   │   ├── Title (TEXT) "버거킹 논현점..."
│   │   ├── Price (TEXT) "시급 11,000원"
│   │   └── tag_group (INSTANCE)
│   └── img (FRAME)
│       └── image (RECTANGLE)
└── Divider (INSTANCE)

**이 단계에서 파악할 것:**
- 전체 레이아웃 방향 (HORIZONTAL/VERTICAL)
- 주요 섹션 구분
- TEXT 노드의 내용 (어떤 데이터가 표시되는지)
- INSTANCE 노드 (디자인 시스템 컴포넌트 후보)
---
## Phase 2: 컴포넌트 매칭
구조 분석 결과를 바탕으로 기존 컴포넌트와 매칭합니다.
bash
.claude/skills/figma-to-react/scripts/match-components.sh <keyword> [keyword2] ...

**검색 방식 (6가지):**
1. **파일명** - FeedCard.tsx 등
2. **Export 이름** - export const FeedCard
3. **GraphQL fragment/field** - fragment JobPostCard, salary:
4. **정적 텍스트** - 한글 포함 "시급", "원")
5. **Variants/Props** - variants: { size: ... }
6. **복수 키워드 AND** - 모든 키워드 포함하는 파일
**예시:**
bash
./match-components.sh feed              # 단일 키워드
./match-components.sh card image        # 복수 키워드 (AND)
./match-components.sh 시급              # 한글 정적 텍스트
./match-components.sh jobPost salary    # GraphQL field

**키워드 선택 팁:**
- Phase 1 TEXT 내용 참고 ("시급 11,000원" → 시급, salary)
- 구조 패턴 참고 (카드 형태 → card, image)
- 도메인 추론 (공고 관련 → jobPost, feed)
**매칭 결과에 따른 액션:**
| 결과 | 액션 |
|------|------|
| common/에 있음 | 기존 컴포넌트 사용 → 끝 |
| base/에 있음 | 기존 컴포넌트 사용 → 끝 |
| 유사한 컴포넌트 있음 | 확장/수정 검토 |
| 없음 | Phase 3로 진행 |
---
## Phase 3: 스타일 추출
새로 만들어야 할 컴포넌트의 상세 스타일을 추출합니다.
bash
.claude/skills/figma-to-react/scripts/get-styles.sh "<figma-url>" [node-name]

**출력 예시:**
yaml
node: "Info section"
layout:
  direction: column      # → flexDirection: 'column'
  gap: 4px              # → gap: '$x1'
  padding: 16px 0       # → padding: '$x4 0'
children:
  - name: "Title"
    text: "버거킹 논현점..."
    fontSize: 16px      # → $text: 't5Regular'
    fontWeight: 400
    color: #1A1A1A      # → $fg-neutral
  - name: "Price"
    text: "시급 11,000원"
    fontSize: 16px      # → $text: 't5Bold'
    fontWeight: 700
    color: #1A1A1A      # → $fg-neutral

---
## 컴포넌트 생성 가이드
### 기존 컴포넌트 우선 확인

src/components/base/           # 범용 UI
├── buttons/      → Button, ActionButton, BoxButton
├── badge/        → Badge
├── form/         → Input, Textarea, Checkbox
├── dialog/       → Dialog, Alert
├── halfview/     → Halfview (BottomSheet)
└── ...
src/components/common/         # 도메인 특화
├── jobPostCard/  → JobPostCard, JobPostFeedCard
├── applicationCard/
├── resume/
├── filter/
├── banner/
└── ...

### 우선순위: SEED Design → base/common → Stitches
**1순위: SEED Design primitives (스타일링 불필요)**
typescript
import { Box, VStack, HStack, Text, Divider } from '@seed-design/react'
// 텍스트는 Text 컴포넌트 사용 (styled 금지)
<Text textStyle="t7Bold" color="fg.neutral">큰 제목</Text>
<Text textStyle="t4Regular" color="fg.neutral-muted">설명</Text>
// 레이아웃은 VStack/HStack 사용
<VStack gap="x4" p="x4">
  {children}
</VStack>

**2순위: 기존 컴포넌트 (base/, common/)**
typescript
import Button from '@src/components/base/buttons/Button'
import { CheckCircle } from '@src/components/base/form/CheckCircle'

**3순위: 아이콘**
typescript
import { IconChevronRight, IconClose } from '@karrotmarket/react-monochrome-icon'
import { IconKarrot } from '@karrotmarket/react-multicolor-icon'

**4순위: Stitches (위 방법으로 불가능할 때만)**
typescript
import { styled } from '@src/stitches/stitches.config'
const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x4',
  padding: '$x4',
})
const Title = styled('span', {
  $text: 't5Bold',
  color: '$fg-neutral',
})

---
## 토큰 매핑 Quick Reference
### Spacing
| px | token |
|----|-------|
| 4 | $x1 |
| 8 | $x2 |
| 12 | $x3 |
| 16 | $x4 |
| 24 | $x6 |
| 32 | $x8 |
### Typography
| size + weight | token |
|---------------|-------|
| 12px Regular | t2Regular |
| 13px Regular | t3Regular |
| 14px Medium | t4Medium |
| 16px Bold | t5Bold |
### Colors
| 용도 | token |
|------|-------|
| Primary text | $fg-neutral |
| Secondary text | $fg-neutral-muted |
| Background | $bg-layer-default |
| Border | $stroke-neutral-muted |
상세 매핑: references/token-mapping.md
---
## References
- references/figma-api.md - Figma REST API 상세
- references/token-mapping.md - 전체 토큰 매핑
- @docs/designToken.md - 디자인 토큰 목록
- @.claude/skills/apply-design-system/SKILL.md - SEED Design 가이드
10:46 PM

이제 figma-to-react 스킬 전체가 보입니다:

    SKILL.md — 3단계 워크플로우 (구조분석 → 컴포넌트매칭 → 스타일추출)
    scripts/analyze-structure.sh — Phase 1
    scripts/match-components.sh — Phase 2
    scripts/get-styles.sh — Phase 3
    references/figma-api.md — Figma REST API 레퍼런스

잘 설계된 파이프라인입니다. Figma API → jq로 토큰 매핑 → SEED Design 우선순위로 React 컴포넌트 생성하는 흐름이 깔끔하고요.

계속 올려주세요 — 전부 받은 뒤에 요청사항을 말씀해 주시면 됩니다.


Claude는 AI이며 실수할 수 있습니다. 응답을 다시 한번 확인해 주세요.
붙여넣은 내용
4.49 KB •128줄•원본과 형식이 일치하지 않을 수 있습니다
#