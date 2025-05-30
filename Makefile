.PHONY: install build start dev test lint format clean git-add git-commit git-status test-command

install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

test:
	npm test

lint:
	npm run lint

format:
	npm run format

clean:
	rm -rf dist
	rm -rf node_modules

# Git commands
git-add:
	curl -X POST http://localhost:7777/mcp/v1/execute \
		-H "Content-Type: application/json" \
		-d '{"command": "git_add", "parameters": {"files": ["$(files)"]}}'

git-commit:
	curl -X POST http://localhost:7777/mcp/v1/execute \
		-H "Content-Type: application/json" \
		-d '{"message": "$(message)"}'

git-status:
	curl http://localhost:7777/mcp/v1/execute \
		-H "Content-Type: application/json" \
		-d '{"command": "git_status"}'

# Test command
test-command:
	echo "This is a test command" 