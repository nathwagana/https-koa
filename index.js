const Koa = require('koa');
const https = require('https');
const fs = require('fs');
const { default: enforceHttps } = require('koa-sslify');

const app = new Koa();

app.use(enforceHttps({
  port: 3001
}));

app.use(ctx => {
  ctx.body = 'Hello World HTTPS';
});

const options = {
  key: fs.readFileSync('./src/components/key.pem'),
  cert: fs.readFileSync('./src/components/cert.pem')
}

https.createServer(options, app.callback())
    .listen(3001, () => { console.log('listening on 3001') });