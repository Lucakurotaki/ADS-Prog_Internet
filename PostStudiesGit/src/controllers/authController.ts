import { Request, Response } from "express";
import { PostgresAuthRepository } from "../repository/postgresAuthRepository";

export class AuthController{

    
    
    public signUp = async (req: Request, res: Response): Promise<Response> => {

        const repository = new PostgresAuthRepository();

        const {email, name, password} = req.body;

        const user = {email, name, password}

        const result = await repository.register(user);

        return res.status(result.status).json(result.content);
    }

    public signIn = async (req: Request, res: Response): Promise<Response> => {

        const repository = new PostgresAuthRepository();

        const {email, password} = req.body;

        const user = {email, password};

        const result = await repository.enter(user);
        
        return res.status(result.status).json(result.content);
    }

    public me = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }
}