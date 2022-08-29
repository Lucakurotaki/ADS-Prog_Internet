import {  Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const testRouter = Router();

testRouter.use(authMiddleware)

testRouter.get('/', (req,res)=>{
    return res.status(200).json('Test: OK');
});

export default testRouter;