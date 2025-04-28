.PHONY: install build start dev test lint format clean

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