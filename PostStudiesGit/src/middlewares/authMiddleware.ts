import { NextFunction, Request, Response } from "express";
import { PostgresAuthTokenRepository } from "../repository/postgresAuthTokenRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) =>{
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).json({error: 'Invalid credentials.'});
    }

    const [authType, authValue] = auth.split(' ');

    if(authType == 'Basic'){
        //TODO
    }

    if(authType == 'Bearer'){

        const tokenRepository = new PostgresAuthTokenRepository();

        try{
            const tokenEmail = await tokenRepository.checkAcToken(authValue);

            req.body.user_email = tokenEmail;

            return next();
        }catch(e){
            const error = e as Error
            return res.status(401).json({error: error.message})
        }


    }

    
}