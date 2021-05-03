<div align="center">
  <h1>Allow Permit Parking</h1>
  <h4 align="center">Back-End development for allow-permit-parking, simple app for parking management</h4>
</div>

<div align="center">

![Lint](https://github.com/Novanet-Studio/parking/workflows/lint/badge.svg)
<!-- ![Tests](https://github.com/Novanet-Studio/parking/workflows/test/badge.svg) -->

</div>

## Index

- [Architechture](#architecture)
  - [Project Scaffold](#project-scaffold)
- [Development](#development)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Architecture

### Project Scaffold

This application is written using the [Loose Coupling](https://en.wikipedia.org/wiki/Loose_coupling)
architechture pattern (also called _system design_).

Each component of the application (_user service_, _property service_) will have
its own models, routes and business logic related files in a single directory.

Reusable logic, such as database connection is exposed at the root level of
the project module tree.

```
.
├── server.ts
├── database.ts
├── service-name-1\
|   ├── index.ts
|   ├── routes.ts
|   └── models.ts
├── service-name-2\
|   ├── index.ts
|   ├── routes.ts
|   └── models.ts
```

## Development

### Requirements

We use NodeJS for the server implementation and MongoDB to run the database.

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/)
- [MongoDB](https://mongo.db.com)

### Getting Started

First we need to clone the project using Git, to accomplish this we run
`git clone <repository.git>` as follows:

```bash
git clone https://github.com/Novanet-Studio/parking.git
```

This will create a copy of the repository in our system and we will be able
to edit files, commit changes and push them when changes are ready to be published.

Then we need to install project dependencies, this project makes use of `yarn`
to manage the dependencies, to install it you must have NodeJS installed in your system.

Run `node -v` and expect a version tag to be printed to the terminal as follows:

```bash
$ node -v
v14.16.1
```

If the command is not availble, you must install NodeJS before going any
further.

You can [install NodeJS from the official website](https://nodejs.org/) and
follow the steps from the official docs.

When NodeJS is ready, you will be able to run `npm install -g yarn`, this command
will install **yarn** as a global dependency. When the installation completes
you will be able to issue commands using **yarn**.

With both NodeJS and yarn installed in your system, we are able to install
project dependencies. For this you must run `yarn` from the project root directory.

```bash
$ yarn
yarn install v1

[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
✨  Done in 1.35s.
```

At this point we are able to run the server in development mode.
You will also need a MongoDB database instance, on initialization
our server will attempt to open a connection to the MongoDB instance
available. We set connection configurations and other settings using the
`.env` file.

Check on the `.env.sample` file available in the root directory of the
project for a sample of the required configurations, copy the contents of
this file into a new file in the same directory with the name `.env`.

Details on each setting is available in the [Environment Variables](#environment-variables)
section below.

### Environment Variables

Create a `.env` file on the root directory with the following
environment variables.

A `.env.sample` file is also available with predefined values for simplicity.

| Name                | Description                    |
| ------------------- | ------------------------------ |
| `PORT`              | HTTP Port for the server       |
| `MONGO_URI`     | MongoDB connection uri |
| `JWT_SECRET`        | Secret to sign JWT tokens with |

## License

Licensed under the MIT License.
