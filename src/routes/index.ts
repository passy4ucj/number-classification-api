import { Router } from "express";
import { numberClassificationRoutes } from "./number-classification-routes";

const router = Router();

router.use("/classify-number", numberClassificationRoutes);

export { router as applicationRoutes };
