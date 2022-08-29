import { credentials, Client } from "../database/postgres";
import bcrypt from 'bcrypt';

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

        const fuText = `SELECT * FROM userdata WHERE user_email = $1`;
        const fuValue = [user.email];
        
        const foundUser = await pgClient.query(fuText, fuValue);

        if (foundUser.rows.length != 0){
            pgClient.end();
            throw new Error("Account already exists.");
        }

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        const iText = `
            INSERT INTO userdata (user_name, user_email, user_password)
            VALUES ($1, $2, $3)
            RETURNING user_email
        `;

        const iValues = [user.name, user.email, user.password];

        const result = await pgClient.query(iText, iValues);


        await pgClient.end();
        
        const resultEmail = result.rows[0]['user_email'];

        return {email: resultEmail} ;
    }

    public async enter(user: User){

        const pgClient = new Client(this.credentials);

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE user_email = $1`
        const fuValue = [user.email];

        const foundUser = await pgClient.query(fuText, fuValue);

        await pgClient.end();

        if(foundUser.rows.length == 0){
            throw new Error("Invalid Username.");
        }

        if(!bcrypt.compareSync(user.password, foundUser.rows[0]['user_password'])){
            throw new Error("Invalid Password.");
        }

        const userData = foundUser.rows[0]

        return {userData};
    }

}