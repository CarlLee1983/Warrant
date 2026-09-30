.PHONY: verify eval

verify:
	claude plugin validate --strict .
	claude plugin validate --strict plugin/.claude-plugin/plugin.json
	claude plugin validate --strict plugin/skills
	npx --yes markdownlint-cli2@0.23.3

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
