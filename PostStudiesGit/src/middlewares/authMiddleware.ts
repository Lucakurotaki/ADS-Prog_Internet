import { NextFunction, Request, Response } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).json({error: 'Invalid credentials.'});
    }

    const [authType, authValue] = auth.split(' ');

    if(authType == 'Basic'){
        
    }
}