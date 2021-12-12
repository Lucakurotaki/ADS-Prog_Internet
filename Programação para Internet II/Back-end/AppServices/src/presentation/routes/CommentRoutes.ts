import { Router } from "express";
import { CommentController } from "../controllers/CommentController";

const commentControler = new CommentController();

const router = Router();

router.get('/:serviceid', commentControler.getAll);

router.post('/:serviceid', commentControler.add);

router.get('/:serviceid/:id', commentControler.get);

router.put('/:serviceid/:id', commentControler.change);

export default router;