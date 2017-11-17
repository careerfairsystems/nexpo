# This file contains all commands needed to start your dev environment!

.PHONY: install

install: 
	mix local.hex --force && \
	mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez && \
	npm run install-deps && \
	mix ecto.create && \
	mix ecto.migrate