import { Router} from "express";
import { ServiceController } from "../controllers/ServiceController";

const serviceController = new ServiceController();

const router = Router();

router.get('/', serviceController.getAll);

router.post('/', serviceController.create);

router.put('/:id', serviceController.change);

router.get('/:id', serviceController.get);

export default router;