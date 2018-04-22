const Imap = require('imap');
const simpleParser  =require('mailparser').simpleParser;
const fs = require('fs');
const path = require('path');

const cts = fs.readFileSync(path.join(__dirname, 'account.json'));
const account = JSON.parse(cts.toString());
const { host, user, pwd } = account;

console.log(host, user, pwd);
// Imap Initialization
const imap = new Imap({
  user,
  password: pwd,
  host,
  port: 993,
  tls: true
});

const openInbox = callbackFunc => {
  imap.openBox('INBOX', true, callbackFunc);
};

imap.once('ready', () => {
  console.log(imap.state);
  openInbox((err, box) => {
    if (err) throw err;
    console.log('search next...');
    // imap.search( [['OR', 'UNSEEN', ['SINCE', 'March 10, 2018']]], (err, results) => {
    imap.search( ['UNSEEN', ['SINCE', 'March 10, 2018']], (err, results) => {
      console.log('start search...');
      if (err) throw err;
      if (results.length <= 0) return;
      const f = imap.fetch(results, {
        markSeen: true,
        bodies: ''
      });
      f.on('message', (msg, seqno) => {
        msg.on('body', async (stream, _) => {
          const result = await simpleParser(stream);
          console.log('stream:', result);
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
          console.log('subject:', mailInfo.subject);
        });
        msg.once('end', () => console.log(seqno + 'Finished'));
      });
      f.once('error', err => console.log('Fetch error:', err));
      f.once('end', () => {
        console.log('Done fetching all messages.');
        imap.end();
      });
    });
  });
});

imap.once('error', err => console.log(err));
imap.once('end', () => console.log('Connection ended.'));
imap.connect();
console.log(imap.state);