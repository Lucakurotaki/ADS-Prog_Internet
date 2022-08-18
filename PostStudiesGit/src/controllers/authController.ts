import { Request, Response } from "express";
import { credentials, Client } from "../database/postgres";
const bcrypt = require('bcryptjs');

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

        return res.status(200).json(result.rows[0]["id"]);
    }

    public signIn = async (req: Request, res: Response): Promise<Response> => {
        const pgClient = new Client(this.credentials);

        const {email, password} = req.body;

        const user = {email, password};

        await pgClient.connect();

        const fuText = `SELECT * FROM userdata WHERE email = $1`
        const fuValue = [user.email];

        const foundUser = await pgClient.query(fuText, fuValue);

        pgClient.end();

        if(foundUser.rows.length == 0){
            
            return res.status(401).json({error: "Invalid Username."});
        }

        if(!bcrypt.compareSync(user.password, foundUser.rows[0]['password'])){
            return res.status(401).json({error: "Invalid Password."});
        }

        return res.status(200).json(foundUser.rows[0]);
    }

    public me = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }
}