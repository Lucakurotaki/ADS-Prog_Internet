import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authController = new AuthController();

const authRouter = Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/signin', authController.signIn);
authRouter.get('/refresh', authController.refresh);
authRouter.post('/me', authController.me);

export default authRouter;