#!/bin/bash
# Phase 2: 컴포넌트 매칭 (다중 검색)
# Usage: ./match-components.sh "<keyword>" [keyword2] [keyword3] ...
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
COMPONENTS_DIR="$PROJECT_ROOT/src/components"
if [ -z "$1" ]; then
echo "Usage: $0 <keyword> [keyword2] [keyword3] ..."
echo ""
echo "Examples:"
echo "  $0 feed                    # 단일 키워드"
echo "  $0 card image horizontal   # 복수 키워드 (AND)"
echo "  $0 시급                     # 정적 텍스트 검색"
echo "  $0 jobPost salary          # GraphQL field 검색"
exit 1
fi
KEYWORDS="$@"
echo "Keywords: $KEYWORDS"
echo ""
# 1. 파일명 검색
echo "=== 1. File name match ==="
for kw in $KEYWORDS; do
find "$COMPONENTS_DIR/base" "$COMPONENTS_DIR/common" -name "*.tsx" -type f 2>/dev/null | \
grep -i "$kw" | \
grep -v "\.test\." | \
grep -v "\.stories\." | \
grep -v "index\.tsx" | \
sed "s|$COMPONENTS_DIR/||"
done | sort -u | head -15
echo ""
# 2. Export된 컴포넌트명 검색
echo "=== 2. Export name match ==="
grep -rEl "export (default |const |function )[A-Za-z]*${1}[A-Za-z]*" \
"$COMPONENTS_DIR/base" "$COMPONENTS_DIR/common" \
--include="*.tsx" 2>/dev/null | \
grep -v "\.test\." | \
grep -v "\.stories\." | \
sed "s|$COMPONENTS_DIR/||" | \
head -10
echo ""
# 3. GraphQL fragment/field 검색
echo "=== 3. GraphQL fragment/field match ==="
for kw in $KEYWORDS; do
grep -rl "fragment.*$kw\|useFragment.*$kw\|\b${kw}[A-Z][a-z]*:" \
"$COMPONENTS_DIR/base" "$COMPONENTS_DIR/common" \
--include="*.tsx" 2>/dev/null | \
sed "s|$COMPONENTS_DIR/||"
done | sort -u | head -10
echo ""
# 4. 정적 텍스트 검색 (한글 포함)
echo "=== 4. Static text match ==="
for kw in $KEYWORDS; do
grep -rl "$kw" \
"$COMPONENTS_DIR/base" "$COMPONENTS_DIR/common" \
--include="*.tsx" 2>/dev/null | \
grep -v "\.test\." | \
grep -v "\.stories\." | \
sed "s|$COMPONENTS_DIR/||"
done | sort -u | head -10
echo ""
# 5. Variants/Props 검색
echo "=== 5. Variants/Props match ==="
for kw in $KEYWORDS; do
grep -rEl "variants:\s*\{[^}]*$kw|type.*=.*['\"]$kw['\"]|\b${kw}\??\s*:" \
"$COMPONENTS_DIR/base" "$COMPONENTS_DIR/common" \
--include="*.tsx" 2>/dev/null | \
grep -v "\.test\." | \
grep -v "\.stories\." | \
sed "s|$COMPONENTS_DIR/||"
done | sort -u | head -10
echo ""
# 6. 종합 (모든 키워드를 포함하는 파일)
if [ "$#" -gt 1 ]; then
echo "=== 6. Contains ALL keywords ==="
# 첫 번째 키워드로 시작
  first_kw="$1"
shift
  result=$(grep -rl "$first_kw" "$COMPONENTS_DIR/base" "$COMPONENTS_DIR/common" --include="*.tsx" 2>/dev/null)
# 나머지 키워드로 필터링
for kw in "$@"; do
    result=$(echo "$result" | xargs grep -l "$kw" 2>/dev/null || true)
done
echo "$result" | \
grep -v "\.test\." | \
grep -v "\.stories\." | \
sed "s|$COMPONENTS_DIR/||" | \
head -10
fi
