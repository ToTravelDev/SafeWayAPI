const pg = require("pg");
require('dotenv').config();
const { Pool, Client } = pg;
const db = new Client({
    connectionString: process.env.psql
});
try{
    db.connect();
} catch(err) {
    console.log(err)
}

module.exports = db