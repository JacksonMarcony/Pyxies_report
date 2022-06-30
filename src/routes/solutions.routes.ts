import { SolutionController } from "@/presentation/controllers/solution.controller";
import { Request, Response, Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const solutionController = new SolutionController();

const problemRoutes = Router();

problemRoutes.post(
  "/create",
  ensureAuthenticated,
  multer(multerConfig).single("file"),
  solutionController.create
);

export { problemRoutes };
