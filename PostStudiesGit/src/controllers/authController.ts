import { Request, Response } from "express";
import { PostgresAuthRepository } from "../repository/postgresAuthRepository";
import { PostgresAuthTokenRepository } from "../repository/postgresAuthTokenRepository";
import { passwordValidator } from "../utils/passwordValidator";

export class AuthController {



    public signUp = async (req: Request, res: Response): Promise<Response> => {

        const repository = new PostgresAuthRepository();

        const { email, name, password } = req.body;

        const user = { email, name, password }


        try {
            passwordValidator(password);

            const result = await repository.register(user);

            return res.status(201).json(result);
        } catch (e) {
            const error = e as Error
            return res.status(400).json({ error: error.message });
        }


    }

    public signIn = async (req: Request, res: Response): Promise<Response> => {

        const repository = new PostgresAuthRepository();
        const tokenRepository = new PostgresAuthTokenRepository();

        const { email, password } = req.body;

        const user = { email, password };

        try {
            const result = await repository.enter(user);

            const tokens = await tokenRepository.store(user.email);

            const accessToken = tokens.jwtAccessToken;
            const refreshToken = tokens.jwtRefreshToken;

            return res.status(200).json({ user: result, accessToken, refreshToken });
        } catch (e) {
            const error = e as Error
            return res.status(401).json({ error: error.message });
        }
    }

    public refresh = async (req: Request, res: Response) => {
        const tokenRepository = new PostgresAuthTokenRepository();

        const auth = req.headers.authorization;

        if (!auth) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const [authType, authToken] = auth.split(' ');


        try {
            const email = await tokenRepository.checkRefToken(authToken);

            const tokens = await tokenRepository.store(email);

            const accessToken = tokens.jwtAccessToken;
            const refreshToken = tokens.jwtRefreshToken;

            return res.status(201).json({accessToken, refreshToken});
        } catch (e) {
            const error = e as Error
            return res.status(400).json({ error: error.message });
        }
    }

    public changePassword = async (req: Request, res: Response): Promise<Response> =>{
        const repository = new PostgresAuthRepository();

        const { user_email, oldPassword, newPassword } = req.body;


        try {
            if(oldPassword == newPassword){
                throw new Error("The new password must be different from the old password.");
            }
            passwordValidator(newPassword);

            const result = await repository.changePass(user_email, oldPassword, newPassword);

            return res.status(200).json(result);
        } catch (e) {
            const error = e as Error
            return res.status(400).json({ error: error.message });
        }
    }

    public me = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send();
    }

    
}