import pg from "pg";
import "dotenv/config";
const { Pool, Client } = pg;
const db = new Client({
    connectionString: process.env.psql
});

try{
    await db.connect();
} catch(err) {
    console.log(err)
}

export default db