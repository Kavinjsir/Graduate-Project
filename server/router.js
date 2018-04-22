const KoaRouter = require('koa-router');
const pgp = require('pg-promise');
const fs = require('fs');
const path = require('path');

const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;

const send = require('./send');
const fetch = require('./getMails');
// const fetchNewMails = require('./receiveNewMails');

// DB connect
const DB = require('./dbconnect');

// Get Account Info
const cts = fs.readFileSync(path.join(__dirname, 'account.json'));
const account = JSON.parse(cts.toString());
const sendHost = 'smtp.qq.com';
const receiveHost = 'imap.qq.com';
const user = account.user;
const pass = account.pwd;

async function fecthMails(ctx) {
  // await fetchNewMails.connect();
  const imap = new Imap({
    user,
    password: pass,
    host: receiveHost,
    port: 993,
    tls: true
  });
  
  const openInbox = callbackFunc => {
    imap.openBox('INBOX', true, callbackFunc);
  }

  imap.once('ready', () => {
    openInbox((err, box) => {
      if (err) throw err;
      // UNSEEN
      imap.search(['UNSEEN'], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          const f = imap.fetch(results, { bodies: '', markSeen: true });
          f.on('message', (msg, seqno) => {
            msg.on('body', async (stream, info) => {
              const result = await simpleParser(stream);
              const mailInfo = new Object();
              mailInfo.tag = 'inbox';
              mailInfo.read = false;
              mailInfo.account = user;
              mailInfo.from = result.from.text.split(' ')[0];
              mailInfo.address = result.from.text.split('<')[1].split('>')[0];
              mailInfo.time = result.date.toLocaleString();
              mailInfo.subject = result.subject;
              mailInfo.message = result.text;
              mailInfo.html = result.html;
              console.log(mailInfo);
              const res = await DB.one(
                'INSERT INTO mail VALUES(${account}, ${from}, ${address}, ${time}, ${message}, ${subject}, ${tag}, ${read}, uuid_generate_v4(), ${html}) RETURNING id',
                mailInfo
              );
            });
            msg.once('end', () => console.log(seqno + 'Finished'));
          });
          f.once('error', err => console.log('Fetch error:', err));
          f.once('end', () => {
            console.log('Done fetching all messages.');
            imap.end();
          });
        }
      });
    })
  })

  imap.once('error', err => console.log(err, imap.state));
  imap.once('end', () => {
    console.log(imap.state);
  });

  await imap.connect();
/////////////////////////////////////
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
        // message: mail.message,
        message: mail.html,
        subject: mail.subject,
        tag: mail.mailtag,
        read: mail.read.toString(),
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