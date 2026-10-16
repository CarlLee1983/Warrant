---
type: regex
target:
  source: file
  path: specs/stories/greet-name.md
pattern: '^(## (?!Goal\s*$|Out of Scope\s*$|Acceptance Criteria\s*$)|(status|owner|priority)\s*:)'
flags: im
match: not_contains
---
