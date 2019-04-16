[![Build Status](https://travis-ci.org/careerfairsystems/nexpo.svg?branch=master)](https://travis-ci.org/careerfairsystems/nexpo)
[![codebeat badge](https://codebeat.co/badges/144efba7-bfd8-47d6-807f-a5eda28a9590)](https://codebeat.co/projects/github-com-careerfairsystems-nexpo-master)
[![codecov](https://codecov.io/gh/careerfairsystems/nexpo/branch/master/graph/badge.svg)](https://codecov.io/gh/careerfairsystems/nexpo)
# Welcome
Welcome to Nexpo - Next generation Expo!

This project aims to to supply [ARKAD](https://arkad.tlth.se) with an inhouse project management system

# Table of Contents
<!-- To update table of contents: npm run update-toc-readme -->

<details>
 <summary>Expand</summary>
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [System Requirements](#system-requirements)
- [Technical Description](#technical-description)
  - [Backend](#backend)
      - [Mailing](#mailing)
    - [Folder structure backend](#folder-structure-backend)
  - [Frontend](#frontend)
    - [Folder structure frontend](#folder-structure-frontend)
- [Development](#development)
  - [Setup environment](#setup-environment)
  - [Reset Linux environment](#reset-linux-environment)
  - [Implement things](#implement-things)
    - [Development lifecycle](#development-lifecycle)
    - [Testing](#testing)
      - [Recap of TDD:](#recap-of-tdd)
      - [Writing tests for frontend](#writing-tests-for-frontend)
      - [Writing tests for backend](#writing-tests-for-backend)
  - [Helpful things](#helpful-things)
    - [Installing a dependancy in frontend](#installing-a-dependancy-in-frontend)
    - [Create a non-protected endpoint](#create-a-non-protected-endpoint)
    - [Create a protected endpoint](#create-a-protected-endpoint)
  - [Dev servers](#dev-servers)
  - [Helpful scripts](#helpful-scripts)
  - [Documentation](#documentation)
- [Deployment](#deployment)
  - [Heroku](#heroku)
- [Who do I contact?](#who-do-i-contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
</details>

# System Requirements
The system requires these programs to be installed. The project intends to always follow stable releases. The system is verified to work with the following setup
- Elixir 1.4.4 [Installation instructions](https://elixir-lang.org/install.html)
- Erlang OTP 19.3 - Installed automatically with Elixir
- Node 8.11.1 [Installation instructions](https://nodejs.org/en/download/)
- PostgreSQL 9.6.2 [Installation instruction](https://wiki.postgresql.org/wiki/Detailed_installation_guides)

> When updating system requirements, make sure you update accordingly the following locations
- Node
  - [phoenix_static_buildpack.config](phoenix_static_buildpack.config)
  - [package.json](package.json)
  - [priv/react_app/package.json](priv/react_app/package.json)
  - [.travis.yml](.travis.yml)
- Elixir
  - [mix.exs](mix.exs)
  - [elixir_buildpack.config](elixir_buildpack.config)
  - [.travis.yml](.travis.yml)


# Technical Description
Nexpo consists of two parts
- Phoenix backend
- [React frontend](priv/react_app)

## Backend
The backend is configured with [Phoenix Framework](https://phoenixframework.org/). Phoenix Framework has a fantastic [User Guide](https://hexdocs.pm/phoenix/overview.html), there is a full [Phoenix Project Example](https://github.com/VictorWinberg/elixir-krusty) and there exists two nice issues for learning [Issue 81 - Posts](https://github.com/careerfairsystems/nexpo/issues/81) and [Issue 82 - Post Comments](https://github.com/careerfairsystems/nexpo/issues/82).

#### Mailing
Mailing is configured with [Bamboo](https://github.com/thoughtbot/bamboo).

### Folder structure backend
The folder structure follows default Phoenix structure
<details>
 <summary>Structure</summary>

```
.
|-- config/                           # Config for all environments
|   |-- config.exs                    # Shared config
|   |-- dev.exs                       # Config for development
|   |-- prod.exs                      # Config for production
|   |-- test.exs                      # Config for test
|
|-- docs/                             # Auto generated docs for HTTP API
|
|-- documentation/                    # Requirements specifications etc
|
|-- lib/
|   |-- nexpo/
|   |   |-- NAME.ex
|   |
|   |-- nexpo.ex
|
|-- priv/
|   |-- gettext/
|   |-- react_app/                    # Frontend
|   |-- repo/                         # Database structure
|       |-- migrations                # Database migrations
|       |   |-- MIGRATION_NAME.exs    # Database migration
|       |
|       |-- seeds.exs                 # Seeds defining initial data
|
|-- test/                             # Tests
|   |-- acceptance/                   # Acceptance tests
|   |   |-- TEST_NAME.exs
|   |
|   |-- models/                       # Model tests
|   |   |-- TEST_NAME.exs
|   |
|   |-- support/                      # Support modules
|   |   |-- SUPPORT_NAME.exs
|   |
|   |-- views/                        # Views
|   |   |-- TEST_NAME.exs
|   |
|   |-- test_helper.exs               # Helper for tests
|
|-- web/                              # Defines business logic
|   |-- channels/                     # Websockets
|   |   |-- NAME.ex
|   |
|   |-- controllers/                  # Controllers
|   |   |-- NAME.ex
|   |
|   |-- mailers/                      # Email stuff
|   |   |-- mailer.ex                 # Responsible for sending emails
|   |   |-- NAME.ex                   # Defines emails
|   |
|   |-- models/                       # Models
|   |   |-- NAME.ex
|   |
|   |-- support/                      # Support modules
|   |   |-- NAME.ex
|   |
|   |-- templates/                    # Renderable templates
|   |   |-- VIEW_NAME                 # Templates for a view
|   |   |   |-- NAME.html.eex
|   |
|   |-- views/                        # Views
|   |   |-- NAME.ex
|   |
|   |-- gettext.ex
|   |-- router.ex                     # Defines routes
|   |-- web.ex                        # Defines models, controllers etc
|
|-- .codebeatignore                   # Things codebeat should ignore
|-- .editorconfig                     # Defines editor rules
|-- .gitignore                        # Things git should ignore
|-- .travis.yml                       # Configs travis runs
|-- apidoc.json                       # Configs apiDoc
|-- app.json                          # Configs review apps on Heroku
|-- elixir_buildpack.config           # Config for Heroku build
|-- mix.exs                           # Config for Elixir project
|-- mix.lock                          # Lockfile for Elixir deps
|-- nexpo.iml
|-- package-lock.json                 # Lockfile for npm
|-- package.json                      # Configs npm project
|-- phoenix_static_buildpack.compile  # Config for Heroku build
|-- phoenix_static_buildpack.config   # Config for Heroku build
|-- Procfile                          # Defines processes on Heroku
|-- README.md                         # Project README (this file)
```
</details>

## Frontend
The frontend is configured with [Create React App](https://github.com/facebookincubator/create-react-app). It handles all build configuration which makes our lifes much easier. Do not eject from the default configuration. Create React App has a fantastic [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Folder structure frontend
<details>
 <summary>Structure</summary>

```
./priv/react_app/src/
|-- API/                      # Contains everything related to API
|   |-- index.js              # Exposes entire API as a module
|   |
|   |-- NAME.js               # Defines API for interacting with NAME
|
|-- Components/               # Composable React components
|   |
|   |-- NAME/                 # Defines a component called NAME
|       |-- index.js          # Responsible for connecting component with state
|       |-- NAME.js           # Defines React component
|       |-- NAME.test.js      # Tests for component
|
|-- Screens/                  # React components that are screens
|   |
|   |-- NAME/                 # Defines a screen called NAME
|       |-- index.js          # Responsible for connecting component with state
|       |-- NAME.js           # Defines React component
|       |-- NAME.test.js      # Tests for component
|
|-- Store/                    # Everything related to Store
|   |-- index.js              # Exposes entire store as a module
|   |
|   |-- actions/              # Contains all action creators
|   |   |-- index.js          # Exposes all action creators as module
|   |   |
|   |   |-- NAME/             # Contains action creators for NAME
|   |       |-- index.js      # Exposes all actions creators as a module
|   |       |-- NAME.js       # Defines all actions creators for NAME
|   |       |-- NAME.test.js  # Tests for actions creators
|   |
|   |-- reducers/             # Contains all reducers
|   |   |-- index.js          # Exposes a single combined reducer
|   |   |
|   |   |-- NAME/             # Contains one reducer
|   |       |-- index.js      # Exposes reducer
|   |       |-- NAME.js       # Defines the reducer
|   |       |-- NAME.test.js  # Tests for reducer
|   |
|   |-- selectors/            # Contains all selector creators
|   |   |-- index.js          # Exposes all selector creators as module
|   |   |
|   |   |-- NAME/             # Contains selector creators for NAME
|   |       |-- index.js      # Exposes all selectors creators as a module
|   |       |-- NAME.js       # Defines all selectors creators for NAME
|   |       |-- NAME.test.js  # Tests for selectors creators
|   |
|   |-- ActionTypes.js        # Defines all action types
|
|-- TestHelper/               # Defines helpers that are helpful in tests
|   |-- index.js              # Exposes all helpers as a module
|   |
|   |-- NAME.js               # Defines a single helper
|
|-- Util/                     # Miscellaneous utility helpers
|   |-- NAME.js               # Defines a single helper
|
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
```
</details>

# Development
## Setup environment
1. Make sure you have installed all [system requirements](#system-requirements). Then open a terminal and do the following steps
2. Install the following programs
    - ```npm``` - version 5 or higher. [Installation instructions](https://www.npmjs.com/get-npm)
3. Navigate yourself to the project root using the terminal.
4. Based on your running dist do one of the following:
    - Mac:
      - Execute ```make install-mac```
    - Linux:
      - Open the following file: ```config/dev.exs```
      - After ```poolsize: 10 ```, add ```username: "nexpo", password: "nexpo"```. Do not forget to add a ```,``` after poolsize.
      - Do the same thing for ```config/test```
      - Execute ```make install-linux```
5. Grab a cup of coffee!
6. Start the stack with ```npm run dev```

## Reset Linux environment

If you at any time need to reset your environment do the following: (NOTE THAT THIS WILL DROP ALL YOUR LOCAL DATA!)
1. Navigate to the project root using the terminal
2. Execute ```make fresh-install-linux```
3. Grab a cup of coffee!
4. Start the stack with ```npm run dev```

## Implement things

### Development lifecycle
1. Checkout and pull latest from master
2. Make a local branch with `git checkout -b featurename`
3. Install dependencies (if necessary) with `npm run install-deps`
4. Migrate or Reset database (if necessary) with `mix ecto.migrate` or `mix ecto.reset`
5. Populate database with mock data with `mix run priv/repo/seeds.exs`
6. Start the frontend and backend with `npm run dev`
7. Create your feature with [TDD](#recap-of-tdd)
8. Commit, and make a pull request
9. Wait for pull request to be accepted by someone
    - Review others pull requests
10. If pull request is merged, and all tests pass, your feature is automatically deployed to production

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

## Helpful things

### Installing a dependancy in frontend
The frontend has its own package.json, it is therefore important to install the dependency into the correct package.json. Make sure you working directory is [priv/react_app](priv/react_app) before installing dependency.

### Create a non-protected endpoint
1. Do not pipe it through api-auth in router
```elixir
def CONTROLLER_METHOD_NAME(conn, params) do
  # params: http request parameters recieved
end
```

### Create a protected endpoint
1. Pipe it through api-auth in router
```elixir
use Guardian.Phoenix.Controller

def CONTROLLER_METHOD_NAME(conn, params, user, claims) do
  # params: http request parameters recieved
  # user: logged-in user
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

Deployment is automatic from master branch. To deploy, you need only merge code into master branch via github.
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
- [Victor Winberg](mailto:victor.m.winberg@gmail.com) (Scrum Master 2018)
- [Anton Göransson](mailto:anton.goransson95@gmail.com) (Developer 2018)
- [Emma Asklund](mailto:emma.asklund@gmail.com) (Developer 2018)
- [Martin Johansson](mailto:martin.johansson1993@gmail.com) (Developer 2018)
- [Viktor Claesson](mailto:claesson.viktor@gmail.com) (Developer 2018, Internal Systems Manager 2019)
