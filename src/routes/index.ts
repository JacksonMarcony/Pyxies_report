import { Router } from "express";
import { userRoutes } from "./users.routes";
import { problemRoutes } from "./problems.routes";


const routes = Router();

routes.use("/users", userRoutes);
routes.use("/problems", problemRoutes);

export { routes };