import { Request, Response } from "express";

export class AuthController{
    public signUp = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }

    public signIn = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }

    public me = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }
}