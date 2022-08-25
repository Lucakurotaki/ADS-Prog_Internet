import { Router } from "express";

const testRouter = Router();

testRouter.get('/get', (req,res)=>{
    return res.status(200).json('OK');
});

export default testRouter;