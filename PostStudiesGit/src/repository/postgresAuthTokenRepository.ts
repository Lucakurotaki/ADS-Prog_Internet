import { credentials, Client } from "../database/postgres";
import jwt, { JwtPayload } from "jsonwebtoken";
import 'dotenv/config'

export class PostgresAuthTokenRepository{
    private credentials;

    constructor(){
        this.credentials = credentials;
    }

    public store = async (email: string)=>{
        const pgClient = new Client(this.credentials);

        const iat = Date.now();

        const jwtAccessToken = jwt.sign({email: email, tokeniat: iat}, process.env.JWT_SECRET!, {expiresIn: 60});
        const jwtRefreshToken = jwt.sign({email: email}, process.env.JWT_SECRET!, {expiresIn: 120});

        await pgClient.connect();

        const fuText = `SELECT * FROM useriat WHERE user_email = $1`;
        const fuValue = [email];

        const foundUser = await pgClient.query(fuText, fuValue);

        if (foundUser.rows.length == 0){
            const iText = `
                INSERT INTO useriat (user_email, iat, refreshtoken)
                VALUES ($1, $2, $3)
            `
            const iValues = [email, iat.toString(), jwtRefreshToken];

            await pgClient.query(iText, iValues);

            await pgClient.end();
        }else{
            const iText = `
            UPDATE useriat SET iat = $1, refreshtoken = $2 WHERE user_email = $3
            `

            await pgClient.query(iText, [iat.toString(), jwtRefreshToken, email]);

            await pgClient.end();
        }

        

        return {jwtAccessToken, jwtRefreshToken};
    }

    public checkAcToken = async(token: string)=> {
        const {email, tokeniat} = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if(!{email, tokeniat}){
            throw new Error('Expired token.');
        }

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM useriat WHERE user_email = $1`;
        const fuValue = [email];

        const foundUser = await pgClient.query(fuText, fuValue);

        await pgClient.end();

        const foundIat = foundUser.rows[0]['iat'];

        if(foundIat != (tokeniat!.toString())){
            throw new Error('Revoked token.');
            
        }

        return email;
    }

    public checkRefToken = async(token: string)=> {
        const {email} = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if(!{email}){
            throw new Error('Expired token.');
        }

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM useriat WHERE user_email = $1`;
        const fuValue = [email];

        const foundUser = await pgClient.query(fuText, fuValue);

        await pgClient.end();

        const foundToken = foundUser.rows[0]['refreshtoken'];

        if(foundToken != token){
            throw new Error('Revoked token.');
            
        }

        return email;
    }
}