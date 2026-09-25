import { Router } from "express";
import { VocabularyController } from "../controllers/vocabulary.controller";
import {
  createVocabularySchema,
  updateVocabularySchema,
} from "../dto/vocabulary.dto";
import { validate } from "../middleware/validate.middleware";

const router = Router();
const controller = new VocabularyController();
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(createVocabularySchema), controller.create);
router.patch("/:id", validate(updateVocabularySchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
