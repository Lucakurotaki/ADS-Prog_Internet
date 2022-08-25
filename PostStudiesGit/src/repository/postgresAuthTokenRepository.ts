import { credentials, Client } from "../database/postgres";

interface TokenObject{
    refreshToken: string;
    userId: string;
}

export class PostgresJWTAuthTokenRepository{
    public store = async (tokenObject: TokenObject) => {
        const pgClient = new Client(credentials);

        await pgClient.connect();

        const text = `
            INSERT INTO jwttoken (userid, refreshtoken)
            VALUES ($1, $2)
            RETURNING refreshtoken
        `;

        const values = [tokenObject.userId, tokenObject.refreshToken];
        
        const result = await pgClient.query(text, values);

        await pgClient.end();

        return result.rows[0]['refreshtoken'];

    }

    public check = async ()=>{
        //TODO
    }
}