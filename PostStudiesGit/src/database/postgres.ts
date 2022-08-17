const {Pool, Client} = require('pg');
import 'dotenv/config';


//Por enquanto, só testando a conexão com a DB.

const credentials = {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.PG_KEY,
    port: 15432,
}

const connectPool = async () => {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();

    return now;
}

const connectClient = async () => {
    const client = new Client(credentials);
    const now = await client.query("SELECT NOW()");
    await client.end();

    return now;
}

(async() => {
    const poolResult = await connectPool();
    console.log("Time with pool: " + poolResult.rows[0]["now"]);

    const clientResult = await connectClient();
    console.log("Time with client: " + clientResult.rows[0]["now"]);
})();