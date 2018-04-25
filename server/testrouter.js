const KoaRouter = require('koa-router');
const pgp = require('pg-promise');
const fs = require('fs');
const path = require('path');
const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const send = require('./send');
const fetchMails = require('./getMails');
const DB = require('./dbconnect');

require('es6-promise').polyfill();
require('isomorphic-fetch');

async function getAccountMails(ctx) {
  const {
    sendHost,
    receiveHost,
    user,
    pwd
  } = ctx.request.body;

  // If invalid, return false
  if (!sendHost || !receiveHost || !user || !pwd) {
    ctx.body = 'Wrong account info';
    ctx.status = 400;
  }
  console.log(sendHost, receiveHost, user, pwd);
  // fetch account mails from the 3rd mail server
  // imap initialization
  const imap = new Imap({
    user,
    password: pwd,
    host: receiveHost,
    port: 993,
    tls: true
  });
  console.log(imap);
  const openInbox = callbackFunc => {
    imap.openBox('INBOX', true, callbackFunc);
  }

  // fetch all mails
  imap.once('ready', () => {
    openInbox((err, box) => {
      if (err) throw err;
      // UNSEEN
      imap.search(['UNSEEN'], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          const f = imap.fetch(results, {
            bodies: '',
            markSeen: true
          });
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
            console.log('Done fetching all unseen messages.');
          });
        }
      });
      // SEEN
      imap.search(['SEEN'], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          const f = imap.fetch(results, {
            bodies: '',
            markSeen: true
          });
          f.on('message', (msg, seqno) => {
            msg.on('body', async (stream, info) => {
              const result = await simpleParser(stream);
              const mailInfo = new Object();
              mailInfo.tag = 'inbox';
              mailInfo.read = true;
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
            console.log('Done fetching all seen messages.');
            imap.end();
          });
        }
      });
    })
  })
  imap.once('error', err => {
    console.log(err, imap.state);
    return;
  });

  imap.once('end', () => {
    console.log(imap.state);
  });

  // start connecting...
  await imap.connect();

  // Store Account Info (for later use)
  const account = {
    sendHost,
    receiveHost,
    user,
    pwd
  };
  fs.writeFileSync(path.join(__dirname, 'acct.json'), JSON.stringify(account));
}

async function fecthMails(ctx) {
  // fetch from db
  try {
    const result = await fetchMails();
    let mailList = [];
    // for (const mail of result) {
    //   mailList = [
    //     ...mailList,
    //     {
    //       from: mail.mailfrom,
    //       address: mail.address,
    //       time: mail.sendtime,
    //       // message: mail.message,
    //       message: mail.html,
    //       subject: mail.subject,
    //       tag: mail.mailtag,
    //       read: mail.read.toString(),
    //     }
    //   ];
    // }
    for (const mail of result) {
      if (mail.message != null) {
        mailList = [
          ...mailList,
          {
            id: mail.id,
            content: mail.message,
          }
        ];
      }
    }
    console.log(mailList);
    fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(mailList));
    try {
      const response = await fetch('http://202.120.40.69:12346/sendjson', {
        method: 'POST',
        body: JSON.stringify(mailList),
        // body: fs.readFileSync(path.join(__dirname, 'test.json')),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const result = await response.json();
      console.log(result);
      mailList = [...mailList, result];
    } catch (error) {
      console.log(error);
    }

    ctx.body = mailList;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
}

async function sendMail(ctx) {
  const cts = fs.readFileSync(path.join(__dirname, 'acct.json'));
  const accountInfo = JSON.parse(cts.toString());
  const account = {
    host: accountInfo.sendHost,
    user: accountInfo.user,
    pass: accountInfo.pwd
  };
  const {
    to,
    subject,
    text
  } = ctx.request.body;
  if (!to || !subject || !text) {
    ctx.status = 400;
    ctx.body = 'wrong data';
    return;
  }
  // ignore type check temporary
  const message = {
    to,
    subject,
    text
  };
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

async function logOut(ctx) {
  const {
    address
  } = ctx.request.body;
  if (address == null) {
    ctx.body = 'Invalid value.';
    ctx.status = 200;
    return;
  }
  // DB operation to delete all related mails when logout.
  // TODO

  ctx.body = 'done';
  ctx.status = 200;
}

const router = new KoaRouter();

router.get('/inbox', fecthMails);
router.post('/sent', sendMail);
router.post('/login', getAccountMails);
router.delete('logout', logOut);

module.exports = router;