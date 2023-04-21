# Holaplex Hub Starter

A template repository to help you build NFT based applications using the Holaplex Hub.

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
 /pages
   /api # next js api routes
 /modules # utility clients and functions
   db.ts # prisma db client
   holaplex.ts # configured holaplex client
 /queries # holaplex api queries
 /mutations # holaplex api mutations
```
## Getting Started

To run locally, spin up a local webhook using [ngrok](https://ngrok.com/):
1. [Download](https://ngrok.com/download) and install ngrok
2. Start ngrok to create a public URL for your localhost. Replace 3000 with your local server's port if it differs.
```
ngrok http 3000
```
3. Note the Forwarding URL (e.g. https://yoursubdomain.ngrok.ioor yoursubdomain.ngrok-free.app) for configuring the webhook (see https://docs.holaplex.dev/hub/Guides/hosting-locally)

To spin up the app, ensure you have nodejs and docker installed on your workstation. Then:

```
# start postgres in a docker container
docker compose up -d

# install dependencies
npm install

# setup database
npm run db

# setup prisma client
npm run generate

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
# https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview
HOLAPLEX_WEBHOOK_SECRET=
# https://docs.holaplex.dev/hub/Guides/creating-a-project
HOLAPLEX_PROJECT_ID=
# https://docs.holaplex.dev/hub/Guides/creating-drops
HOLAPLEX_DROP_ID=
# https://docs.holaplex.dev/hub/Guides/creating-a-customer-wallet
HOLAPLEX_WALLET_ASSET_TYPE=SOL
```

### Migrations

Follow the [Prisma guide](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate) on adjusting the database through migrations. Once the Prisma schema has been adjusted run `npm run migrate`.

## Release

Coming Soon...