# Table of Contents
<!--
To update table of contents, use doctoc:
  yarn global add doctoc
  doctoc README.md --github

Further read: https://github.com/thlorenz/doctoc
-->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Technical Description](#technical-description)
- [System Requirements](#system-requirements)
- [Development](#development)
  - [Setup environment](#setup-environment)
    - [Mac](#mac)
    - [Linux](#linux)
    - [Windows](#windows)
  - [Develop](#develop)
    - [TDD](#tdd)
    - [Start dev servers](#start-dev-servers)
  - [Documentation](#documentation)
- [Deployment](#deployment)
  - [Heroku](#heroku)
- [Who do I contact?](#who-do-i-contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Technical Description
Nexpo consists of two parts
- Phoenix backend
- [React frontend](priv/react_app)

# System Requirements
This system intends to follow stable releases. The system is verified to work with the follow setup
- Elixir 1.4.4
- Erlang OTP 19.3
- Node 6.11.0
- PostgreSQL 9.6.2

# Development
## Setup environment
This project assumes you have some programs installed:
- ```nenv``` - [Installation instructions](https://github.com/ryuone/nenv#installation)
- ```yarn```- [Installation instructions](https://yarnpkg.com/en/docs/install)
- ```brew``` (If you are on mac) - [Installation instructions](https://brew.sh/index.html)
- ```heroku CLI``` - [Installation instructions](https://devcenter.heroku.com/articles/heroku-cli)
- ```PostgreSQL```

```cd``` to the base catalog, then copy paste the relevant code block in your terminal.
### Mac
```sh
brew update
brew install elixir
mix local.hex
mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez
nenv install 6.11.0
brew install postgresql
brew services start postgresql

mix deps.get
mix ecto.create
mix ecto.migrate
yarn install
cd priv/react_app && yarn install
cd ../..
```
### Linux
>Pending

### Windows
Get a grip of yourself. Get a real OS, and then come back

## Develop

### TDD
This project is developed with [TDD](https://en.wikipedia.org/wiki/Test-driven_development).

This is how you start phoenix testwatcher
```sh
mix test.watch
```
Phoenix tests reside in [/test](/test)

>TODO: Define how react tests works and where they are

### Start dev servers
A separate development Procfile exists which allows us to start react dev server in parallell with phoenix server
```sh
heroku local -f Procfile.dev
```

## Documentation
[REST API docs](https://careerfairsystems.github.io/nexpo/)

The REST API is documented using [Slate](https://github.com/lord/slate)
- Documentation is changed in the [docs](careerfairsystems/nexpo/tree/docs) branch.
- run ```./deploy.sh``` after you have pushed your changes, to publish them
- This builds the files, and pushes them to the [gh-pages](careerfairsystems/nexpo/tree/gh-pages) branch

# Deployment
The system is hosted at [arkad-nexpo.herokuapp.com](https://arkad-nexpo.herokuapp.com)
## Heroku
- Authenticated users will find the Heroku app [here](https://dashboard.heroku.com/apps/arkad-nexpo)
- It uses the following buildpacks
  - [Elixir buildpack](https://github.com/HashNuke/heroku-buildpack-elixir)
  - [Phoenix static buildpack](https://github.com/gjaldon/heroku-buildpack-phoenix-static)
- Phoenix provides good documentation of our setup [here](http://www.phoenixframework.org/docs/heroku)
- React frontend is automatically built on deploy with a custom setup of [phoenix static buildpack](https://github.com/gjaldon/heroku-buildpack-phoenix-static)
- Elixir and Erlang versions are specified in [elixir_buildpack.config](elixir_buildpack.config)
- Node version is specified in [phoenix_static_buildpack.config](phoenix_static_buildpack.config)

# Who do I contact?
- [Joel Klint](mailto:joel.klint@gmail.com) (Developer 2017)
- [Oscar Rydh](mailto:oscar.rydh.93@gmail.com) (Developer 2017)
