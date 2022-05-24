import { UserController } from "../presentation/controllers/user.controller";
import { Router } from "express";

const userController = new UserController()

const userRoutes = Router();

userRoutes.get("/listen", ()=>{});
userRoutes.post("/create", userController.create);

export { userRoutes };