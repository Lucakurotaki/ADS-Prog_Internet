import { Router } from "express";
import authRouter from './authRoutes';
import testRouter from './testRoute';

const router = Router();

router.use('/auth',authRouter);
router.use('/test', testRouter);

export default router;