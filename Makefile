.PHONY: verify

verify:
	claude plugin validate --strict .
	claude plugin validate --strict .claude-plugin/plugin.json
	claude plugin validate --strict skills
	npx --yes markdownlint-cli2@0.23.3
