# Holaplex Hub Starter

A template repository to help you build NFT based applications using Holaplex Hub.

Includes:

- [NextJS](https://nextjs.org/) 13 web framework (app directory enabled)
- Postgres database management using [Prisma ORM](https://www.prisma.io/docs)
- User management with social based login through [next-auth](https://next-auth.js.org/)
- Style application using Tailwind
- Holaplex Hub SDK

## Folder Structure

```
/prisma
  schema.prisma # prisma schema file
  /migrations # prisma auto-generated migration files
/src
 /app # next js app directory
  /login # social sign up or login
  page.tsx # home page
 /pages
   /api # next js api routes
    graphql.ts # apps graphql server
 /modules # utility clients and functions
   db.ts # prisma db client
   holaplex.ts # configured holaplex client
 /queries # holaplex and app api queries
 /mutations # holaplex and app api mutations
 tailwind.config.js # color theme
```
## Getting Started

Ensure you have nodejs and docker installed on your workstation.

```
# start postgres in a docker container
docker compose up -d

# install dependencies
npm install

# setup database
npm run db

# boot up the app
npm run dev
```

See your app at [http://localhost:3000](http://localhost:3000)

## Environment

Create a `.env` file at the root of the project. Add the following environment variable.

```
# setup SSO with Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# database
DATABASE_URL=postgres://postgres:holaplex@localhost:5432/hub-starter
POSTGRES_DB=hub-starter
POSTGRES_PASSWORD=holaplex

# holaplex
HOLAPLEX_API_ENDPOINT=https://api.holaplex.com/graphql
# https://docs.holaplex.dev/api
HOLAPLEX_AUTH_TOKEN=
```

### Migrations

Follow the [Prisma guide](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate) on adjusting the database through migrations. Once the Prisma schema has been adjusted run `npm run migrate`.

## Release
The starter is designed to be deployed to [render](https://render.com) using their Infrastructure as Code (IaC) configuration file [render.yaml](/render.yaml). The IaC manifest will set up a web server for the mint page and a database for storing users, sessions, and wallets.

### Database
After deploying the environment, access the shell of the web server and run the following command to create and set up the database schema:

```
npm run db
```

### Environment Variables
Although the IaC will create placeholder environment variables for the web service, you will need to update them to match your Holaplex account.

