const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
// const router = require('./router');
const router = require('./newrouter');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.code === 400) {
      ctx.status = 400;
      ctx.body = e.message;
    }
    if (e.code === 500) {
      ctx.status = 500;
    }
    console.log(e);
  }
});

app.use(cors());
app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5555, () => console.log('Server is listening at port 5555...'));