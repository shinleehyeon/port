# Figma REST API Reference

## Authentication

```bash
# Personal Access Token 사용
curl -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/..."
```

## URL 파싱

```
Figma URL 형식:
https://www.figma.com/design/:fileKey/:fileName?node-id=:nodeId

예시:
https://www.figma.com/design/ABC123xyz/MyDesign?node-id=1426-29287

추출:
- fileKey: ABC123xyz
- nodeId: 1426-29287 (URL 그대로, 하이픈 유지)
```

## 주요 API Endpoints

### 1. 파일 전체 가져오기

```bash
GET https://api.figma.com/v1/files/:fileKey

# 응답 구조
{
  "document": {
    "id": "0:0",
    "name": "Document",
    "type": "DOCUMENT",
    "children": [...]  # 페이지들
  },
  "components": {...},
  "styles": {...}
}
```

### 2. 특정 노드 가져오기 (권장)

```bash
GET https://api.figma.com/v1/files/:fileKey/nodes?ids=:nodeId

# 여러 노드: ids=1426-29287,1426-29288
# depth 제한: &depth=2

# 응답 구조
{
  "nodes": {
    "1426:29287": {
      "document": {
        "id": "1426:29287",
        "name": "Card",
        "type": "FRAME",
        "children": [...],
        "fills": [...],
        "strokes": [...],
        "cornerRadius": 12,
        "paddingLeft": 16,
        "paddingRight": 16,
        "paddingTop": 16,
        "paddingBottom": 16,
        "itemSpacing": 8,
        "layoutMode": "VERTICAL",
        "absoluteBoundingBox": {
          "x": 0, "y": 0, "width": 343, "height": 200
        }
      }
    }
  }
}
```

### 3. 이미지 내보내기

```bash
GET https://api.figma.com/v1/images/:fileKey?ids=:nodeId&format=png&scale=2

# format: png, jpg, svg, pdf
# scale: 1-4 (기본 1)

# 응답
{
  "images": {
    "1426:29287": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/..."
  }
}
```

## Node Types

| Type | 설명 | 주요 속성 |
|------|------|----------|
| FRAME | 프레임/컨테이너 | children, layoutMode, padding, itemSpacing |
| GROUP | 그룹 | children |
| COMPONENT | 컴포넌트 정의 | children, componentPropertyDefinitions |
| INSTANCE | 컴포넌트 인스턴스 | componentId, componentProperties |
| TEXT | 텍스트 | characters, style |
| RECTANGLE | 사각형 | fills, strokes, cornerRadius |
| VECTOR | 벡터 | fills, strokes |

## 스타일 속성

### fills (배경/채우기)

```json
{
  "fills": [{
    "type": "SOLID",
    "color": { "r": 1, "g": 0.5, "b": 0, "a": 1 }  // 0-1 범위
  }]
}
```

색상 변환:
```javascript
// Figma RGBA (0-1) → HEX
const toHex = (r, g, b) =>
  '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('')

// 예: { r: 1, g: 0.345, b: 0.133 } → #FF5822
```

### style (텍스트)

```json
{
  "style": {
    "fontFamily": "Pretendard",
    "fontSize": 16,
    "fontWeight": 700,
    "lineHeightPx": 24,
    "letterSpacing": -0.3,
    "textAlignHorizontal": "LEFT"
  }
}
```

### Layout (Auto Layout)

```json
{
  "layoutMode": "VERTICAL",     // VERTICAL, HORIZONTAL, NONE
  "itemSpacing": 8,             // gap
  "paddingLeft": 16,
  "paddingRight": 16,
  "paddingTop": 16,
  "paddingBottom": 16,
  "primaryAxisAlignItems": "MIN",      // justify-content: MIN=start, CENTER, MAX=end, SPACE_BETWEEN
  "counterAxisAlignItems": "MIN",      // align-items: MIN=start, CENTER, MAX=end
  "layoutWrap": "NO_WRAP"              // flex-wrap
}
```

### Effects (그림자 등)

```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 4 },
    "radius": 8,
    "spread": 0
  }]
}
```

## 실전 예시

### 카드 컴포넌트 분석

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/ABC123/nodes?ids=1426-29287" | jq '.nodes["1426:29287"].document'
```

응답 분석:
```json
{
  "name": "Card",
  "type": "FRAME",
  "layoutMode": "VERTICAL",
  "itemSpacing": 12,
  "paddingLeft": 16,
  "paddingRight": 16,
  "paddingTop": 16,
  "paddingBottom": 16,
  "cornerRadius": 12,
  "fills": [{
    "type": "SOLID",
    "color": { "r": 1, "g": 1, "b": 1, "a": 1 }
  }],
  "children": [
    {
      "name": "Title",
      "type": "TEXT",
      "characters": "카드 제목",
      "style": {
        "fontSize": 16,
        "fontWeight": 700,
        "lineHeightPx": 24
      },
      "fills": [{
        "color": { "r": 0.1, "g": 0.1, "b": 0.1, "a": 1 }
      }]
    },
    {
      "name": "Description",
      "type": "TEXT",
      "characters": "설명 텍스트",
      "style": {
        "fontSize": 14,
        "fontWeight": 400,
        "lineHeightPx": 20
      },
      "fills": [{
        "color": { "r": 0.4, "g": 0.4, "b": 0.4, "a": 1 }
      }]
    }
  ]
}
```

→ React 컴포넌트로 변환:
```typescript
const Card = styled('div', {
  display: 'flex',
  flexDirection: 'column',  // layoutMode: VERTICAL
  gap: '$x3',               // itemSpacing: 12
  padding: '$x4',           // padding: 16
  borderRadius: '$r3',      // cornerRadius: 12
  backgroundColor: '$bg-layer-default',  // white
})

const Title = styled('span', {
  $text: 't5Bold',          // 16px Bold
  color: '$fg-neutral',     // dark text
})

const Description = styled('span', {
  $text: 't4Regular',       // 14px Regular
  color: '$fg-neutral-muted', // gray text
})
```

## Rate Limits

- 기본: 720 requests/hour
- 대용량 파일은 캐싱 권장
- 이미지 URL은 14일간 유효