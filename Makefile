test: node_modules
	@NODE_ENV=test ./node_modules/.bin/mocha test/*-test.js

node_modules:
	npm install

.PHONY: test
