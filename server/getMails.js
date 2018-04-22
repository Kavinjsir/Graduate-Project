const pgp = require('pg-promise');
const fs = require('fs');
const path = require('path');

const cts = fs.readFileSync(path.join(__dirname, 'db.json'));
const dbInfo = JSON.parse(cts.toString());

// DB initialization
// const DB = pgp()(dbInfo.url);
const DB = require('./dbconnect');

module.exports= () => {
  return DB.many('SELECT * FROM mail');
}