!/bin/bash

# Phase 3: 상세 스타일 추출 (토큰 변환용)
# Usage: ./get-styles.sh "<figma-url>" [node-name-filter]

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

# .env.local에서 FIGMA_TOKEN 로드
if [ -f "$PROJECT_ROOT/.env.local" ]; then
  export $(grep FIGMA_TOKEN "$PROJECT_ROOT/.env.local" | xargs)
fi

if [ -z "$FIGMA_TOKEN" ]; then
  echo "Error: FIGMA_TOKEN not found in .env.local"
  exit 1
fi

URL="$1"
NODE_FILTER="$2"

if [ -z "$URL" ]; then
  echo "Usage: $0 <figma-url> [node-name-filter]"
  echo "Example: $0 'https://www.figma.com/design/ABC123/File?node-id=123-456'"
  echo "         $0 'https://...' 'Title'"
  exit 1
fi

# URL 파싱
FILE_KEY=$(echo "$URL" | sed -n 's|.*figma.com/design/\([^/]*\)/.*|\1|p')
NODE_ID=$(echo "$URL" | sed -n 's|.*node-id=\([^&]*\).*|\1|p')

if [ -z "$FILE_KEY" ] || [ -z "$NODE_ID" ]; then
  echo "Error: Invalid Figma URL"
  exit 1
fi

# 토큰 매핑 함수들이 포함된 jq 스크립트
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/nodes?ids=$NODE_ID&depth=10" | jq --arg filter "$NODE_FILTER" '
def spacing_token:
  if . == 2 then "$x0_5"
  elif . == 4 then "$x1"
  elif . == 6 then "$x1_5"
  elif . == 8 then "$x2"
  elif . == 12 then "$x3"
  elif . == 16 then "$x4"
  elif . == 20 then "$x5"
  elif . == 24 then "$x6"
  elif . == 32 then "$x8"
  else "\(.)px"
  end;

def radius_token:
  if . == 4 then "$r1"
  elif . == 8 then "$r2"
  elif . == 12 then "$r3"
  elif . == 16 then "$r4"
  elif . == 9999 then "$full"
  else "\(.)px"
  end;

def typography_token:
  (.fontSize | floor) as $size |
  (.fontWeight // 400) as $weight |
  (if $weight >= 700 then "Bold"
   elif $weight >= 500 then "Medium"
   else "Regular"
   end) as $w |
  (if $size == 11 then "t1"
   elif $size == 12 then "t2"
   elif $size == 13 then "t3"
   elif $size == 14 then "t4"
   elif $size == 16 then "t5"
   elif $size == 18 then "t6"
   elif $size == 20 then "t7"
   else "t\($size)"
   end) as $t |
  "\($t)\($w)";

def color_to_hex:
  if . then
    def to_hex: (. * 255 | floor) | (if . < 16 then "0" else "" end) + (. | floor | if . < 10 then (48 + .) | [.] | implode elif . < 16 then (87 + .) | [.] | implode else ((. / 16 | floor) | if . < 10 then (48 + .) else (87 + .) end | [.] | implode) + ((. % 16) | if . < 10 then (48 + .) else (87 + .) end | [.] | implode) end);
    "#\(.r | to_hex)\(.g | to_hex)\(.b | to_hex)" | ascii_upcase
  else null end;

def extract_styles:
  {
    name: .name,
    type: .type
  } +
  (if .type == "FRAME" or .type == "INSTANCE" then {
    layout: {
      direction: (if .layoutMode == "VERTICAL" then "column → flexDirection: column"
                  elif .layoutMode == "HORIZONTAL" then "row → flexDirection: row"
                  else null end),
      gap: (if .itemSpacing then "\(.itemSpacing | floor)px → \(.itemSpacing | floor | spacing_token)" else null end),
      padding: {
        top: (if .paddingTop then "\(.paddingTop | floor)px → \(.paddingTop | floor | spacing_token)" else null end),
        right: (if .paddingRight then "\(.paddingRight | floor)px → \(.paddingRight | floor | spacing_token)" else null end),
        bottom: (if .paddingBottom then "\(.paddingBottom | floor)px → \(.paddingBottom | floor | spacing_token)" else null end),
        left: (if .paddingLeft then "\(.paddingLeft | floor)px → \(.paddingLeft | floor | spacing_token)" else null end)
      } | with_entries(select(.value != null)),
      cornerRadius: (if .cornerRadius then "\(.cornerRadius | floor)px → \(.cornerRadius | floor | radius_token)" else null end)
    } | with_entries(select(.value != null and .value != {}))
  } else {} end) +
  (if .type == "TEXT" then {
    text: .characters,
    typography: "\(.style.fontSize | floor)px \(if .style.fontWeight >= 700 then "Bold" elif .style.fontWeight >= 500 then "Medium" else "Regular" end) → $text: \(.style | typography_token)",
    color: (if .fills[0].color then "\(.fills[0].color | color_to_hex) → $fg-neutral (확인필요)" else null end)
  } else {} end) +
  (if .fills and (.fills | length > 0) and .fills[0].type == "SOLID" and .type != "TEXT" then {
    background: "\(.fills[0].color | color_to_hex) → $bg-* (확인필요)"
  } else {} end) +
  {
    children: (if .children then [.children[] | extract_styles] else null end)
  } | with_entries(select(.value != null));

.nodes | to_entries[0].value.document |
if $filter != "" then
  .. | objects | select(.name == $filter) | extract_styles
else
  extract_styles
end
'