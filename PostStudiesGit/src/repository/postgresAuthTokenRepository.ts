import { credentials, Client } from "../database/postgres";

interface TokenObject{
    token: string;
    user: object;
}

export class PostgresJWTAuthTokenRepository{
    public store = async (tokenObject: TokenObject) => {
        const pgClient = new Client(credentials);

        await pgClient.connect();

        const text = `
            INSERT INTO jwttoken (user, token)
            VALUES = ($1, $2)
            RETURNING token
        `;

        const values = [tokenObject.user, tokenObject.token];
        
        const result = await pgClient.query(text, values);

        await pgClient.end();

        return result.rows[0]['token'];

    }
}