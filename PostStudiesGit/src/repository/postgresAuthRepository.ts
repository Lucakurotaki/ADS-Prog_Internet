import { credentials, Client } from "../database/postgres";

import bcrypt from 'bcrypt';

interface User{
    id?: string;
    name?: string;
    email: string;
    password: string;
}

interface Result{
    status: number;
    content: object;
}

export class PostgresAuthRepository{
    private credentials;

    constructor(){
        this.credentials = credentials;
    }

    public async register(user: User): Promise<Result>{

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1`;
        const fuValue = [user.email];
        
        const foundUser = await pgClient.query(fuText, fuValue);

        if (foundUser.rows.length != 0){
            pgClient.end();
            return {status: 409, content: {error: "Account already exists."}}
        }

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        const iText = `
            INSERT INTO userdata (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `;

        const iValues = [user.name, user.email, user.password];

        const result = await pgClient.query(iText, iValues);


        await pgClient.end();

        return {status: 200, content: {id: result.rows[0]["id"]}} as Result;
    }

    public async enter(user: User): Promise<Result>{

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1`
        const fuValue = [user.email];

        const foundUser = await pgClient.query(fuText, fuValue);

        await pgClient.end();

        if(foundUser.rows.length == 0){
            return {status: 401, content: {error: "Invalid Username."}} as Result;
        }

        if(!bcrypt.compareSync(user.password, foundUser.rows[0]['password'])){
            return {status: 401, content: {error: "Invalid Password."}} as Result;
        }

        return {status: 200, content: foundUser.rows[0]} as Result;
    }

}