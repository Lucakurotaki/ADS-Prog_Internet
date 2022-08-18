const {Client} = require('pg');
import 'dotenv/config';


//Por enquanto, só testando a conexão com a DB.

const credentials = {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.PG_KEY,
    port: 15432,
}

const pgClient = new Client(credentials);


export {credentials, Client};