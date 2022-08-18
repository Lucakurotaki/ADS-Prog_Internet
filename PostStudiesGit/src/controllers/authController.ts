import { Request, Response } from "express";
import { credentials, Client } from "../database/postgres";

interface User{
    id?: string;
    name: string;
    email: string;
    password: string;
}

export class AuthController{

    private credentials;

    constructor(){
        this.credentials = credentials;
    }
    
    public signUp = async (req: Request, res: Response): Promise<Response> => {

        const pgClient = new Client(this.credentials);

        const {email, name, password} = req.body;

        const user = {email, name, password}

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1`;
        const fuValue = [user.email];
        
        const foundUser = await pgClient.query(fuText, fuValue);

        if (foundUser.rows.length != 0){
            pgClient.end();
            return res.status(409).json({error: "Account already exists."});
        }

        const iText = `
            INSERT INTO userdata (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `;

        const iValues = [user.name, user.email, user.password];

        const result = await pgClient.query(iText, iValues);


        await pgClient.end();

        return res.status(200).json(result.rows[0]["id"]);
    }

    public signIn = async (req: Request, res: Response): Promise<Response> => {
        const pgClient = new Client(this.credentials);

        const {email, password} = req.body;

        const user = {email, password};

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1 AND password = $2`
        const fuValues = [user.email, user.password];

        const foundUser = await pgClient.query(fuText, fuValues);

        if(foundUser.rows.length == 0){
            pgClient.end();
            return res.status(401).json({error: "Username or password is invalid."})
        }

        pgClient.end();

        return res.status(200).json(foundUser.rows[0]);
    }

    public me = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }
}