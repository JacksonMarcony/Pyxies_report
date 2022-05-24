import { UserController } from "../presentation/controllers/user.controller";
import { Request, Response, Router } from "express";
import multer from 'multer';
import { multerConfig } from "../config/multer";

const userController = new UserController()

const userRoutes = Router();

userRoutes.get("/listen", ()=>{});
userRoutes.post("/create", multer(multerConfig).single('file'), userController.create);
userRoutes.post("/login", userController.login);
userRoutes.post("/upload", multer(multerConfig).single('file'), (request: Request, response: Response) => {
    console.log(request.file);
    
});

export { userRoutes };