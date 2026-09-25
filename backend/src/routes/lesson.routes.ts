import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller";
import { createLessonSchema, updateLessonSchema } from "../dto/lesson.dto";
import { validate } from "../middleware/validate.middleware";

const router = Router();
const controller = new LessonController();
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.patch("/", validate(createLessonSchema), controller.create);
router.put("/:id", validate(updateLessonSchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
