MAKEFLAGS = -j1

export NODE_ENV = test

# Fix color output until TravisCI fixes https://github.com/travis-ci/travis-ci/issues/7967
export FORCE_COLOR = true

.PHONY: build docs clean clean-docs watch commit flow lint lint-fix bump publish postinstall test test-watch coverage

build:
	yarn build

docs:
	yarn build:docs
	open ./docs/index.html

clean:
	yarn build:clean

clean-docs:
	yarn build:clean:docs

watch:
	yarn build

commit:
	yarn commit

flow:
	yarn flow

lint:
	yarn lint

lint-fix:
	yarn lint:fix

bump:
	yarn packages:bump

publish:
	yarn packages:publish

postinstall:
	yarn postinstall

test:
	yarn test

test-watch:
	yarn test:watch

coverage:
	yarn coverage

