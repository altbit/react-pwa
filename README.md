# React Material Design skeleton application

Complete example of React Material Design application built from scratch.

## Motivation

Recent years front-end development become so versatile. It is no more a JavaScript language with jQuery library. 
Modern web application is a complex system included many components. 

When developers started to build their first front-end application they faced many manuals for 
particular components. And when they try to bundle them together things could get very hard.

This project is here to help developers build react progressive web application. Live example, 
what could be better?

Here you can find newest versions of components bundled to a complete working system:

* webpack 3.0+
* react 15.5+
* react-router 4.1+
* material-ui 1.0+ (alpha yet)
* redux
* redux-form
* express
* mongoose
* server node v6+ (ES6)

## Installation

Install [Node.js](https://nodejs.org/en/download/)

Install [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/)

Install Yarn (globally):

```sh
sudo npm install -g yarn
```

Install Node modules: 

```sh
yarn install
```

## Building

Build project 

```sh
npm run build
```

Run Server API

```sh
DEBUG=server*,router*,controller*,service* npm start
```

Run dev server (only for development)

```sh
npm run dev
```

## Production

Build project as before.

Install PM2 (globally):

```sh
sudo npm install -g pm2
```

Run Server API

```sh
pm2 start server/bin/http.js
```

Config nginx

```
server {
    listen 80;

    root /var/www/react-pwa/public;
    index index.html;
    server_name react-pwa.io;

    access_log /var/log/nginx/react-pwa-access.log;
    error_log /var/log/nginx/react-pwa-error.log;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```