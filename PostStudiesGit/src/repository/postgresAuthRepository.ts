import { credentials, Client } from "../database/postgres";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'

interface User{
    id?: string;
    name?: string;
    email: string;
    password: string;
}

export class PostgresAuthRepository{
    private credentials;

    constructor(){
        this.credentials = credentials;
    }

    public async register(user: User): Promise<object>{

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1`;
        const fuValue = [user.email];
        
        const foundUser = await pgClient.query(fuText, fuValue);

        if (foundUser.rows.length != 0){
            pgClient.end();
            throw new Error("Account already exists.");
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
        
        const id = result.rows[0]['id'];

        return {id} ;
    }

    public async enter(user: User){

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1`
        const fuValue = [user.email];

        const foundUser = await pgClient.query(fuText, fuValue);

        await pgClient.end();

        if(foundUser.rows.length == 0){
            throw new Error("Invalid Username.");
        }

        if(!bcrypt.compareSync(user.password, foundUser.rows[0]['password'])){
            throw new Error("Invalid Password.");
        }

        const userData = foundUser.rows[0]

        const jwtAccessToken = jwt.sign({email: user.email}, process.env.JWT_SECRET!, {expiresIn: '1d' });
        const jwtRefreshToken = jwt.sign({email: user.email}, process.env.JWT_SECRET!, {expiresIn: '30d'});

        return {userData, jwtAccessToken, jwtRefreshToken};
    }

}