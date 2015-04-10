# Node API [![Circle CI](https://circleci.com/gh/dciccale/node-api-mongo-docker.svg?style=svg)](https://circleci.com/gh/dciccale/node-api-mongo-docker)

An example of a dockerized node API built with [hapijs](http://hapijs.com), [mongodb](https://www.mongodb.org/) and [mongoose](https://mongoosejs.com).

## Installation

```bash
$ npm install
```

## Development

```bash
$ npm start
```

List users

```bash
curl http://localhost:8888/users
```

## Tests

```bash
$ npm test
```

## Coverage

```bash
$ npm run coverage
```

## Lint

Run [ESLint](http://eslint.org/)

```bash
$ npm run lint
```

## Docker

Install [Docker](https://docs.docker.com/installation/#installation) and [Compose](https://docs.docker.com/compose/install/#install-compose)

Start docker and run:

```bash
$ docker-compose up
```

See [docker-compose.yml](docker-compose.yml) and [Dockerfile](Dockerfile)

Will install al dependencies, run the api server for production through port 8888 mapped to
port 80.

Image at DockerHub [dciccale/node-api-mongo-docker](https://registry.hub.docker.com/u/dciccale/node-api-mongo-docker/)

## Continuous Integration

With [CircleCI](https://circleci.com/), see [circle.yml](circle.yml)

Build url: https://circleci.com/gh/dciccale/node-api-mongo-docker
