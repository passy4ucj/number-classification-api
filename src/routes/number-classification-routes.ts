import { Router } from "express";
import { classifyNumberController } from "../controllers";

const router = Router();


router
  .route("/")
  .get(classifyNumberController);

export { router as numberClassificationRoutes };
