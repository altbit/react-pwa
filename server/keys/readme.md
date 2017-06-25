put you valid ssl server.crt and server.key here

to generate self-signed certificate do the following:

```sh
openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr
```

You will be prompted your domain info. Fill Common Name with your server full domain
name. Rest fields are not important

```sh
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```