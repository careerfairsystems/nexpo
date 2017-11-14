[![Build Status](https://travis-ci.org/careerfairsystems/nexpo.svg?branch=master)](https://travis-ci.org/careerfairsystems/nexpo)
[![codebeat badge](https://codebeat.co/badges/144efba7-bfd8-47d6-807f-a5eda28a9590)](https://codebeat.co/projects/github-com-careerfairsystems-nexpo-master)
# Welcome
Welcome to Nexpo - Next generation Expo!

This project aims to to supply [ARKAD](https://arkad.tlth.se) with an inhouse project management system

# Table of Contents
<!-- To update table of contents: npm run update-toc-readme -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Technical Description](#technical-description)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [System Requirements](#system-requirements)
- [Development](#development)
  - [Setup environment](#setup-environment)
  - [Implement things](#implement-things)
    - [Development lifecycle](#development-lifecycle)
    - [Testing](#testing)
      - [Recap of TDD:](#recap-of-tdd)
      - [Writing tests for frontend](#writing-tests-for-frontend)
      - [Writing tests for backend](#writing-tests-for-backend)
  - [Dev servers](#dev-servers)
  - [Helpful scripts](#helpful-scripts)
  - [Documentation](#documentation)
- [Deployment](#deployment)
  - [Heroku](#heroku)
- [Who do I contact?](#who-do-i-contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Technical Description
Nexpo consists of two parts
- Phoenix backend
- [React frontend](priv/react_app)

## Backend
Mailing is configured with [Bamboo](https://github.com/thoughtbot/bamboo).

## Frontend
The frontend is configured with [Create React App](https://github.com/facebookincubator/create-react-app). It handles all build configuration which makes our lifes much easier. Do not eject from the default configuration. Create React App has a fantastic [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# System Requirements
The system requires these programs to be installed. The project intends to always follow stable releases. The system is verified to work with the following setup
- Elixir 1.4.4 [Installation instructions](https://elixir-lang.org/install.html)
- Erlang OTP 19.3 - Installed automatically with Elixir
- Node 6.11.4 [Installation instructions](https://nodejs.org/en/download/)
- PostgreSQL 9.6.2 [Installation instruction](https://wiki.postgresql.org/wiki/Detailed_installation_guides)

We recommend installing ```node``` with nenv. [Installation instructions](https://github.com/ryuone/nenv)

# Development
## Setup environment
1. Make sure you have installed all [system requirements](#system-requirements)
2. Install the following programs
    - ```npm``` - version 5 or higher. [Installation instructions](https://www.npmjs.com/get-npm)
3. ```cd``` to the base catalog, then copy paste the relevant code block in your terminal.

- Mac or Linux
```sh
mix local.hex &&
mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez

npm run install-deps &&
mix ecto.create &&
mix ecto.migrate
```

- Windows
```sh
# You are on your own my friend. Install Linux or macOS
```

## Implement things

### Development lifecycle
1. Make a local branch
2. Create your feature with [TDD](#recap-of-tdd)
3. Commit, and make a pull request
4. Wait for pull request to be accepted by someone
    - Review others pull requests
5. If pull request is merged, and all tests pass, your feature is automatically deployed to production

### Testing
This project is developed with [TDD](https://en.wikipedia.org/wiki/Test-driven_development). \
This means that all code should be tested. We are urging all developers to follow this for the following reasons
- You will know for sure if you break anything when touching the code
- We are changing developers every year. You will make everything easier for the next team!

#### Recap of TDD:
1. Write a test
2. Make sure it fails
3. Implement code that makes it pass
4. Make sure your code is pretty and scalable

These are some commands to help you run all tests

| Command                      | Description                     |
|------------------------------|---------------------------------|
| `npm run test`               | Runs all tests                  |
| `npm run test-frontend`      | Runs all frontend tests         |
| `npm run test-backend`       | Runs all backend tests          |
| `npm run testwatch-backend`  | Starts testwatcher for backend  |
| `npm run testwatch-frontend` | Starts testwatcher for frontend |

#### Writing tests for frontend
- All tests should be beside what is it testing. If there is a component named ```Component```, its test should be beside it and named ```Component.test.js```
- The frontend is configured with [jest](https://facebook.github.io/jest/) as its testrunner.
- For react tests, the project is configured with [enzyme](https://github.com/airbnb/enzyme). This makes it easy to unit test a component
- There are test helpers in [/priv/react_app/src/TestHelper](/priv/react_app/src/TestHelper)

#### Writing tests for backend
All tests should be in the [/test](/test) folder

You can define two different types of test cases
- Unauthenticated tests
```elixir
test "name of the testcase", %{conn: conn} do
  # Write the test here. All requests will by a non-logged in user
end
```
- Authenticated tests
```elixir
@tag :logged_in
test "name of the testcase", %{conn: conn, user: user} do
  # Write the test here. All requests will by the logged in user
end
```

## Dev servers
| Command                | Description                |
|------------------------|----------------------------|
| `npm run dev`          | Start frontend and backend |
| `npm run dev-backend`  | Start the backend          |
| `npm run dev-frontend` | Start the frontend         |

- Backend server is run on localhost:4000
  - Visit [localhost:4000/sent_emails](http://localhost:4000/sent_emails) to see emails sent in development
- Frontend server is run on localhost:3000
  - All api-calls are proxied transparently to the backend

## Helpful scripts
| Command                         | Description                               |
|---------------------------------|-------------------------------------------|
| `npm run generate-docs`         | Generates documentation for HTTP API      |
| `npm run validate-editorconfig` | Identifies breakage of editorconfig rules |
| `npm run update-toc-readme`     | Updates Table of Contents in README       |
| `npm run download-prod-db`      | Replace development DB with production DB |


## Documentation
The HTTP API is documented using [apiDoc](http://apidocjs.com).
Documentation is changed in the code via special tags. More detailed information can be found [here](http://apidocjs.com/#params)

See documentation generation instructions under [Helpful scripts](#helpful-scripts).
Documentation can be found in docs/ directory

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
