# This file contains all commands needed to start your dev environment!

.PHONY: fresh-install-linux install-mac install-linux install-deps reset-db create-db-user

create-db-user:
	psql -d postgres -c "CREATE USER nexpo PASSWORD 'nexpo' CREATEDB;"

reset-db:
	psql -d postgres -c "DROP DATABASE IF EXISTS nexpo_dev;"
	psql -d postgres -c "DROP DATABASE IF EXISTS nexpo_test;"
	psql -d postgres -c "DROP USER IF EXISTS nexpo;"

install-deps:
	mix local.hex --force && \
	mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez && \
	npm run install-deps && \
	mkdir -p $(HOME)/.s3bucket/nexpo-test && \
	mix ecto.create && \
	mix ecto.migrate

install-linux: create-db-user install-deps
	npm test

install-mac: install-deps
	npm test

fresh-install-linux: reset-db create-db-user install-deps
	npm test
