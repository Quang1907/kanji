import { Router } from "express";
import { LearningController } from "../controllers/learning.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { learningSyncSchema } from "../dto/learning.dto";

const router = Router();
const controller = new LearningController();

router.post("/sync", authenticate, validate(learningSyncSchema), controller.sync);

export default router;
