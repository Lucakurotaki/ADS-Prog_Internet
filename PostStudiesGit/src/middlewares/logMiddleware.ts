import { Request, Response, NextFunction } from "express";

export const logMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const date = new Date();
    const method = req.method;
    const protocol = req.protocol;
    const path = req.originalUrl;
    const hostname = req.hostname;

    console.log(
        `Log\n
        Time: ${date}\nMethod: ${method}\nProtocol: ${protocol}\n
        Path: ${path}\nHostname: ${hostname}`
    );

    return next();


}