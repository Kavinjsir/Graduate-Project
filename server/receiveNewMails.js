const pgp = require('pg-promise');
const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const fs = require('fs');
const path = require('path');

// Get Account Info
const cts = fs.readFileSync(path.join(__dirname, 'account.json'));
const account = JSON.parse(cts.toString());
const host = 'smtp.qq.com';
const user = account.user;
const pass = account.pwd;

// DB initialization
// const dbInfo = fs.readFileSync(path.join(__dirname, 'db.json'));
// const dbaccount = JSON.parse(dbInfo.toString());
// const DB = pgp()(dbaccount.url);
const DB = require('./dbconnect');

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
      if (results.length > 0) {
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
            mailInfo.html = result.html;
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
          imap.end();
        });
      }
    });

    // SEEN
    // imap.search(['SEEN'], (err, results) => {
    //   if (err) throw err;
    //   if (results.length > 0) {
    //     const f = imap.fetch(results, {
    //       bodies: ''
    //     });
    //     f.on('message', (msg, seqno) => {
    //       msg.on('body', async (stream, info) => {
    //         const result = await simpleParser(stream);
    //         const mailInfo = new Object();
    //         mailInfo.tag = 'inbox';
    //         mailInfo.read = true;
    //         mailInfo.account = '1963465249@qq.com';
    //         mailInfo.from = result.from.text.split(' ')[0];
    //         mailInfo.address = result.from.text.split('<')[1].split('>')[0];
    //         mailInfo.time = result.date.toLocaleString();
    //         mailInfo.subject = result.subject;
    //         mailInfo.message = result.text;
    //         mailInfo.html = result.html;
    //         console.log(mailInfo);
    //         const res = await DB.one(
    //           'INSERT INTO mail VALUES(${account}, ${from}, ${address}, ${time}, ${message}, ${subject}, ${tag}, ${read}, uuid_generate_v4(), ${html}) RETURNING id',
    //           mailInfo
    //         );
    //         console.log(res);
    //       });
    //       msg.once('end', () => console.log(seqno + 'Finished'));
    //     });
    //     f.once('error', err => console.log('Fetch error:', err));
    //     f.once('end', () => {
    //       console.log('Done fetching all messages.');
    //       imap.end();
    //     });
    //   }
    // });
  });
});

imap.once('error', err => console.log(err));
imap.once('end', () => console.log('Connection ended.'));
// imap.connect();

module.exports = imap;