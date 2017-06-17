# Table of Contents
<!--
To update table of contents, use doctoc:
  npm i -g doctoc
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
    - [Phoenix](#phoenix)
    - [React](#react)
  - [Documentation](#documentation)
- [Deployment](#deployment)
- [Who do I contact?](#who-do-i-contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Technical Description
Nexpo consists of two parts
- Phoenix backend
- [React frontend](priv/react_app)

# System Requirements
This system intends to follow stable releases. The system is verified to work with the follow setup
- Elixir 1.4.4
- Erlang OTP 19
- Node 6.11.0
- PostgreSQL 9.6.2

# Development
## Setup environment
This project assumes you have some programs installed:
- ```nvm``` - [Installation instructions](https://github.com/creationix/nvm#install-script)
- ```brew``` (If you are on mac) - [Installation instructions](https://brew.sh/index.html)

Copy paste the relevant code block into your terminal.
### Mac
```sh
brew update
brew install elixir
mix local.hex
mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez
nvm install 6.11.0 --lts
brew install postgresql
brew services start postgresql

mix deps.get
mix ecto.create
mix ecto.migrate
cd priv/react_app && yarn install
```
### Linux
>Pending

### Windows
Get a grip of yourself. Get a real OS, and then come back

## Develop
### Phoenix
The Phoenix server is developed using [TDD](https://en.wikipedia.org/wiki/Test-driven_development).
Tests reside in ```/test```.
- Run testwatcher using ```mix test.watch```
- Start server using ```mix phoenix.server```

### React
- You must stand in ```/priv/react_app```
- Start development server using ```yarn start```

## Documentation
[REST API docs](https://careerfairsystems.github.io/nexpo/)

The REST API is documented using [Slate](https://github.com/lord/slate)
- Documentation is changed in the ```docs``` branch.
- run ```./deploy.sh``` after you have pushed your changes, to publish them
- This builds the files, and pushes them to the ```gh-pages``` branch

# Deployment
>Pending.

- Phoenix has a Heroku buildpack
- React frontend must be built on heroku push

[Phoenix deployment](http://www.phoenixframework.org/docs/deployment)

# Who do I contact?
- [Joel Klint](mailto:joel.klint@gmail.com) (Developer 2017)
- [Oscar Rydh](mailto:oscar.rydh.93@gmail.com) (Developer 2017)
