const pgp = require('pg-promise');
const fs = require('fs');
const path = require('path');

// DB initialization
const dbInfo = fs.readFileSync(path.join(__dirname, 'db.json'));
const dbaccount = JSON.parse(dbInfo.toString());
const DB = pgp()(dbaccount.url);

module.exports = DB;