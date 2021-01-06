# arty

## Build Setup

### Client-side

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Backend

```bash
# Install mysql

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
cp .env.example .env

# Start backend server at localhost:4000
$ node api/index.js
```
