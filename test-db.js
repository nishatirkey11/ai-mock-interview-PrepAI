require("dotenv").config({ path: ".env.local" });
const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
const db = drizzle(sql);

async function main() {
    try {
        const res = await db.execute('SELECT * FROM "adminInterview"');
        console.log("AdminInterviews count:", res.rows.length);
        console.log("Rows:", res.rows);
    } catch(e) {
        console.error("DB Error:", e);
    }
}
main();
