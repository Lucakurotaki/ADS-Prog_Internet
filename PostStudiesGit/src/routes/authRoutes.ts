import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authController = new AuthController();

const authRouter = Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/signin', authController.signIn);
authRouter.get('/refresh', authController.refresh);
authRouter.put('/change-password', authMiddleware, authController.changePassword);
authRouter.post('/me', authController.me);

export default authRouter;