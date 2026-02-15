#!/bin/bash
# Phase 1: Figma 디자인 구조를 트리 형태로 분석
# Usage: ./analyze-structure.sh "<figma-url>" [depth]
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
DEPTH="${2:-5}"
if [ -z "$URL" ]; then
echo "Usage: $0 <figma-url> [depth]"
echo "Example: $0 'https://www.figma.com/design/ABC123/File?node-id=123-456'"
exit 1
fi
# URL 파싱
FILE_KEY=$(echo "$URL" | sed -n 's|.*figma.com/design/\([^/]*\)/.*|\1|p')
NODE_ID=$(echo "$URL" | sed -n 's|.*node-id=\([^&]*\).*|\1|p')
if [ -z "$FILE_KEY" ] || [ -z "$NODE_ID" ]; then
echo "Error: Invalid Figma URL"
exit 1
fi
# API 호출 및 트리 출력
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
"https://api.figma.com/v1/files/$FILE_KEY/nodes?ids=$NODE_ID&depth=$DEPTH" | jq -r '
def layout_info:
  if .layoutMode then
    if .layoutMode == "HORIZONTAL" then "H"
    elif .layoutMode == "VERTICAL" then "V"
    else ""
    end
  else ""
  end;
def gap_info:
  if .itemSpacing then " gap:\(.itemSpacing | floor)" else "" end;
def text_preview:
  if .characters then
    " \"\(.characters | if length > 20 then .[:20] + "..." else . end)\""
  else ""
  end;
def node_label:
  "\(.name) (\(.type)\(if .type == "FRAME" or .type == "INSTANCE" then ", \(layout_info)\(gap_info)" else "" end))\(text_preview)";
def print_tree(prefix; is_last):
  . as $node |
  (if is_last then "└── " else "├── " end) as $branch |
  (if is_last then "    " else "│   " end) as $next_prefix |
  "\(prefix)\($branch)\(node_label)",
  ((.children // []) | to_entries[] |
    .value | print_tree("\(prefix)\($next_prefix)"; . == (($node.children // []) | last)));
.nodes | to_entries[0].value.document |
"\(node_label)",
((.children // []) | to_entries[] |
  .value | print_tree(""; . == ((.children // []) | last)))
'