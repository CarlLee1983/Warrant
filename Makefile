.PHONY: verify readme-sync eval

verify: readme-sync
	claude plugin validate --strict .
	claude plugin validate --strict plugin/.claude-plugin/plugin.json
	claude plugin validate --strict plugin/skills
	npx --yes markdownlint-cli2@0.23.3

# README.md is the source; its translations must keep the same structure:
# `##` heading count, code block contents, and relative link targets. Links
# between the READMEs and #anchors are ignored. Meaning is not checked.
README_TRANSLATIONS := README.zh-TW.md README.ja.md

readme-sync:
	@tmp=$$(mktemp -d); status=0; \
	for f in README.md $(README_TRANSLATIONS); do \
		grep -c '^## ' $$f > $$tmp/$$f.headings; \
		awk '/^```/{f=!f;next} f' $$f > $$tmp/$$f.code; \
		grep -oE '\]\([^)]+\)' $$f | sed -e 's/^](//' -e 's/)$$//' -e 's/#.*//' \
			| grep -vE '^(README(\.[A-Za-z-]+)?\.md)?$$' | sort -u > $$tmp/$$f.links; \
	done; \
	for f in $(README_TRANSLATIONS); do \
		for k in headings code links; do \
			if ! diff -u $$tmp/README.md.$$k $$tmp/$$f.$$k; then \
				echo "readme-sync: $$f differs from README.md ($$k)"; status=1; \
			fi; \
		done; \
	done; \
	rm -rf "$$tmp"; exit $$status

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
