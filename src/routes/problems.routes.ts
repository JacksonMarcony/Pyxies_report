import { ProblemController } from "../presentation/controllers/problem.controller";
import { Request, Response, Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const problemController = new ProblemController();

const problemRoutes = Router();

problemRoutes.get("/listen", () => {});
problemRoutes.post(
  "/create",
  ensureAuthenticated,
  multer(multerConfig).single("file"),
  problemController.create
);

export { problemRoutes };
