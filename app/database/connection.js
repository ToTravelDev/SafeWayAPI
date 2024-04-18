import pg from "pg";
import "dotenv/config";

const { Pool, Client } = pg;
const db = new Client({
    connectionString: process.env.psql
});
await db.connect();

export default db