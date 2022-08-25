import { NextFunction, Request, Response } from "express"
import { PostgresJWTAuthTokenRepository } from "../repository/postgresAuthTokenRepository";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).json({error: 'Invalid credentials.'});
    }

    const [authType, authValue] = auth.split(' ');

    if(authType == 'Basic'){
        //TODO
    }

    if(authType == 'Bearer'){
        
    }

    
}