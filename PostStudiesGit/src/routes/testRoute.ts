import {  Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const testRouter = Router();

testRouter.use(authMiddleware)

testRouter.get('/get', (req,res)=>{
    return res.status(200).json('OK');
});

export default testRouter;