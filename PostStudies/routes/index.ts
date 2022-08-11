import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

const router = Router();

//User Routes
router.post('/users/', userController.signUp);
router.post('/users/', userController.signIn);
router.get('/users/', userController.me);

//Post Routes
router.get('/posts/', postController.all);
router.get('/posts/:id', postController.read);
router.post('/posts/', postController.create);

//Like Routes
router.get('/likes/:id', likeController.all);

//Follow Routes
router.get('/follows/:id', followController.all);