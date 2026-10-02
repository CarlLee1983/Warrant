.PHONY: verify readme-sync site eval

verify: readme-sync site
	claude plugin validate --strict .
	claude plugin validate --strict plugin/.claude-plugin/plugin.json
	claude plugin validate --strict plugin/skills
	npx --yes markdownlint-cli2@0.23.3

# README.md is the source; its translations must keep the same structure:
# `##` heading count, code block contents, relative link targets, paragraph
# count, and list item count. Links between the READMEs and #anchors are
# ignored. Meaning is not checked.
# - A list item is a line matching the ERE `^([0-9]+\.|-)[[:space:]]`.
# - A paragraph is a block of consecutive non-empty lines outside code blocks
#   whose first line is not a heading (`#`), not a list item, and not the
#   language switcher on line 3.
README_TRANSLATIONS := README.zh-TW.md README.ja.md
README_LIST_ITEM := ^([0-9]+\.|-)[[:space:]]

readme-sync:
	@tmp=$$(mktemp -d); status=0; \
	for f in README.md $(README_TRANSLATIONS); do \
		grep -c '^## ' $$f > $$tmp/$$f.headings; \
		grep -cE '$(README_LIST_ITEM)' $$f > $$tmp/$$f.list-items; \
		awk '/^```/{c=!c; p=1; next} c{next} /^$$/{p=0; next} \
			!p{p=1; if (!(/^#/ || /$(README_LIST_ITEM)/ || NR == 3)) n++} \
			END{print n+0}' $$f > $$tmp/$$f.paragraphs; \
		awk '/^```/{f=!f;next} f' $$f > $$tmp/$$f.code; \
		grep -oE '\]\([^)]+\)' $$f | sed -e 's/^](//' -e 's/)$$//' -e 's/#.*//' \
			| grep -vE '^(README(\.[A-Za-z-]+)?\.md)?$$' | sort -u > $$tmp/$$f.links; \
	done; \
	for f in $(README_TRANSLATIONS); do \
		for k in headings code links paragraphs list-items; do \
			if ! diff -u $$tmp/README.md.$$k $$tmp/$$f.$$k; then \
				echo "readme-sync: $$f differs from README.md ($$k)"; status=1; \
			fi; \
		done; \
	done; \
	rm -rf "$$tmp"; exit $$status

# Project site (site/): a clean install, type check, then a production build.
# The build output is the completion evidence; site/dist is git ignored.
site:
	npm --prefix site ci
	npm --prefix site run check
	npm --prefix site run build

# Behaviour eval suite. Needs Claude Code credentials and costs money; never
# run in CI. `claude plugin eval` only reads cases below the plugin it tests,
# so the plugin under test (EVAL_PLUGIN) and evals/cases/ are staged together
# under evals/results/, which git ignores, and the stage is removed afterwards.
EVAL_PLUGIN ?= plugin
EVAL_STAGE := evals/results/stage

eval:
	rm -rf $(EVAL_STAGE)
	mkdir -p $(EVAL_STAGE)/evals
	cp -R $(EVAL_PLUGIN)/. $(EVAL_STAGE)/
	cp -R evals/cases/. $(EVAL_STAGE)/evals/
	status=0; \
	claude plugin eval $(EVAL_STAGE) \
		--trust-plugin --scaffold --no-publish \
		--allow-tools Bash Write Edit \
		--ablation none \
		--model claude-sonnet-5-5 \
		--judge-model claude-haiku-4-5-20251001 \
		--runs 3 --threshold 0.67 --max-cost-usd 10 \
		--concurrency 3 \
		--output-dir $(CURDIR)/evals/results/$$(date -u +%Y%m%dT%H%M%SZ) \
		|| status=$$?; \
	rm -rf $(EVAL_STAGE); \
	exit $$status
