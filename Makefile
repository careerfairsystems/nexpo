# This file contains all commands needed to start your dev environment!

.PHONY: install fresh-install

install: 
	sudo -u postgres psql -c "CREATE USER nexpo PASSWORD 'nexpo' CREATEDB;"
	mix local.hex --force && \
	mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez && \
	npm run install-deps && \
	mix ecto.create && \
	mix ecto.migrate && \
	npm test

fresh-install: 
	sudo -u postgres psql -c "DROP DATABASE IF EXISTS nexpo_dev;"
	sudo -u postgres psql -c "DROP DATABASE IF EXISTS nexpo_test;"
	sudo -u postgres psql -c "DROP USER IF EXISTS nexpo;"
	sudo -u postgres psql -c "CREATE USER nexpo PASSWORD 'nexpo' CREATEDB;"
	mix local.hex --force && \
	mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez && \
	npm run install-deps && \
	mix ecto.create && \
	mix ecto.migrate && \
	npm test