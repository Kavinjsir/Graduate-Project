const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const pgp = require('pg-promise');
const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Get Account Info
const cts = fs.readFileSync(path.join(__dirname, 'account.json'));
const account = JSON.parse(cts.toString());
const host = 'smtp.qq.com';
const user = account.user;
const pass = account.pwd;

// nodemailer initialization
let transporter = nodemailer.createTransport({
  host,
  port: 587,
  auth: {
    user,
    pass,
  }
});

// DB initialization
const DB = pgp()('postgres://kavin:@127.0.0.1:5432/maildb');

// Imap initailization
const imap = new Imap({
  user,
  password: pass,
  host: 'imap.qq.com',
  port: 993,
  tls: true
});

const openInbox = callbackFunc => {
  imap.openBox('INBOX', true, callbackFunc);
};

imap.once('ready', () => {
  openInbox((err, box) => {
    if (err) throw err;
    // imap.search(['UNSEEN', ['SINCE', 'Mar 20, 2018']], (err, results) => {

    // UNSEEN
    imap.search(['UNSEEN'], (err, results) => {
      if (err) throw err;
      const f = imap.fetch(results, {
        bodies: ''
      });
      f.on('message', (msg, seqno) => {
        msg.on('body', async (stream, info) => {
          const result = await simpleParser(stream);
          const mailInfo = new Object();
          mailInfo.tag = 'inbox';
          mailInfo.read = false;
          mailInfo.account = '1963465249@qq.com';
          mailInfo.from = result.from.text.split(' ')[0];
          mailInfo.address = result.from.text.split('<')[1].split('>')[0];
          mailInfo.time = result.date.toLocaleString();
          mailInfo.subject = result.subject;
          mailInfo.message = result.text;
          //
          mailInfo.html = result.textAsHtml;
          //
          console.log(mailInfo);
          const res = await DB.one(
            'INSERT INTO mail VALUES(${account}, ${from}, ${address}, ${time}, ${message}, ${subject}, ${tag}, ${read}, uuid_generate_v4(), ${html}) RETURNING id',
            mailInfo
          );
        //   console.log(res);
        });
        msg.once('end', () => console.log(seqno + 'Finished'));
      });
      f.once('error', err => console.log('Fetch error:', err));
      f.once('end', () => {
        console.log('Done fetching all messages.');
        // imap.end();
      });
    });

    // SEEN
    // imap.search(['SEEN'], (err, results) => {
    //   if (err) throw err;
    //   const f = imap.fetch(results, {
    //     bodies: ''
    //   });
    //   f.on('message', (msg, seqno) => {
    //     msg.on('body', async (stream, info) => {
    //       const result = await simpleParser(stream);
    //       const mailInfo = new Object();
    //       mailInfo.tag = 'inbox';
    //       mailInfo.read = true;
    //       mailInfo.account = '1963465249@qq.com';
    //       mailInfo.from = result.from.text.split(' ')[0];
    //       mailInfo.address = result.from.text.split('<')[1].split('>')[0];
    //       mailInfo.time = result.date.toLocaleString();
    //       mailInfo.subject = result.subject;
    //       mailInfo.message = result.text;
    //       console.log(mailInfo);
    //       const res = await DB.one(
    //         'INSERT INTO mail VALUES(${account}, ${from}, ${address}, ${time}, ${message}, ${subject}, ${tag}, ${read}, uuid_generate_v4()) RETURNING id',
    //         mailInfo
    //       );
    //       console.log(res);
    //     });
    //     msg.once('end', () => console.log(seqno + 'Finished'));
    //   });
    //   f.once('error', err => console.log('Fetch error:', err));
    //   f.once('end', () => {
    //     console.log('Done fetching all messages.');
    //     imap.end();
    //   });
    // });
  });
});

imap.once('error', err => console.log(err));
imap.once('end', () => console.log('Connection ended.'));

// Server initialization
const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  const result = await DB.many('SELECT * FROM mail');
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
});

router.post('/', async (ctx, next) => {
  const { subject, text } = ctx.request.body;
  let mailOptions = {
    from: '"Tony King" <1963465249@qq.com>',
    to: 'tonyking_jty@126.com',
    subject,
    text,
    html: '<p>' + text + '</p>'
  };
  const result = await transporter.sendMail(mailOptions);
  if (!result) {
    ctx.body = 'bad request';
    ctx.status = 404;
  }
  else {
    console.log(result);
    ctx.body = result;
    ctx.status = 200;
  }
})

app.use(cors());
app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(6066, () => {
  imap.connect();
  console.log('app is listening at 6066');
});