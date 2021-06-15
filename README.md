# arty

## Installation

```bash
# Install mysql

# Install dependencies
$ npm install

# Create mysql user
$ mysql -u root
mysql> CREATE USER 'artyUser'@'localhost' IDENTIFIED BY 'artyarty';
mysql> GRANT ALL PRIVILEGES ON arty.* TO 'artyUser'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> exit

# Create database & run migrations
$ npx sequelize db:create
$ npx sequelize db:migrate

# Copy .env.example to .env (update vars as needed)
$ cp .env.example .env
```

## Commands

| Command | Description |
|---------|-------------|
| npm run dev | Start ExpressJS server in development with Nuxt.js in dev mode (hot reloading). Listen on [http://localhost:3000](http://localhost:3000). |
| npm run build | Build the nuxt.js web application for production. |
| npm start | Start ExpressJS server in production. |

## Migrations

To run migrations:

    $ npx sequelize db:migrate

To generate skeleton migration file in `api/migrations/`: 

    $ npx sequelize-cli migration:generate --name migration-skeleton

## Logging

Server logs are captured using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan) and stored in `/logs`. 
See `api/lib/logger.js` for logger configs.

Nuxt errors are logged to [Sentry](https://sentry.io/) using the [Sentry module for Nuxt](https://sentry.nuxtjs.org/).
