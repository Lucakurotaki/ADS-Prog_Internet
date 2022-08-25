import { Request, Response } from "express";
import { PostgresAuthRepository } from "../repository/postgresAuthRepository";
import { PostgresJWTAuthTokenRepository } from "../repository/postgresAuthTokenRepository";

export class AuthController{

    
    
    public signUp = async (req: Request, res: Response): Promise<Response> => {

        const repository = new PostgresAuthRepository();

        const {email, name, password} = req.body;

        const user = {email, name, password}

        try{
            const result = await repository.register(user);

            return res.status(201).json(result);
        }catch(e){
            return res.status(400).json(e);
        }

        
    }

    public signIn = async (req: Request, res: Response): Promise<Response> => {

        const repository = new PostgresAuthRepository();

        const {email, password} = req.body;

        const user = {email, password};

        const result = await repository.enter(user);

        const userId = result.userData['id'];

        const jwtTokenRepo = new PostgresJWTAuthTokenRepository();

        const jwtRefreshToken = await jwtTokenRepo.store({userId: userId, refreshToken: result.jwtRefreshToken});
        
        return res.status(200).json({user: result.userData, token: jwtRefreshToken});
    }

    public me = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }
}