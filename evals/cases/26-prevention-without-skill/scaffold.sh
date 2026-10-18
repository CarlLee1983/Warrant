#!/usr/bin/env bash
# Same approved fixture, but its prompt forbids obtaining skill or templates.
set -euo pipefail
bash "$(dirname "${BASH_SOURCE[0]}")/../22-prevent-invalid-transitions/scaffold.sh"
