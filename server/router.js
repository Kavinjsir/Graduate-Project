const KoaRouter = require('koa-router');
const pgp = require('pg-promise');
const fs = require('fs');
const path = require('path');
const send = require('./send');
const fetch = require('./getMails');

// Get Account Info
const cts = fs.readFileSync(path.join(__dirname, 'account.json'));
const account = JSON.parse(cts.toString());
const sendHost = 'smtp.qq.com';
const receiveHost = 'imap.qq.com';
const user = account.user;
const pass = account.pwd;

async function fecthMails(ctx) {
  // fetch from db
  const result = await fetch();
  let mailList = [];
  for (const mail of result) {
    mailList = [
      ...mailList,
      {
        from: mail.mailfrom,
        address: mail.address,
        time: mail.sendtime,
        message: mail.message,
        subject: mail.subject,
        tag: mail.mailtag,
        read: mail.read.toString()
      }
    ];
  }
  ctx.body = mailList;
  ctx.status = 200;
}

async function sendMail(ctx) {
  const account = {
    host: sendHost,
    user,
    pass
  };
  const { to, subject, text } = ctx.request.body;
  if (!to || !subject || !text) {
    ctx.status = 400;
    ctx.body = 'wrong data';
    return;
  }
  // ignore type check temporary
  const message = { to, subject, text };
  const result = await send(account, message);
  if (!result) {
    ctx.body = 'bad request';
    ctx.status = 400;
  } else {
    console.log(result);
    ctx.body = result;
    ctx.status = 200;
  }
}

const router = new KoaRouter();

router.get('/inbox', fecthMails);
router.post('/sent', sendMail);

module.exports = router;