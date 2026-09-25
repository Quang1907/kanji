import { Router } from "express";
import { KanjiController } from "../controllers/kanji.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createKanjiSchema,
  createKanjiBulkSchema,
  updateKanjiSchema,
} from "../dto/kanji.dto";

const router = Router();

const controller = new KanjiController();

router.get("/", controller.getAll);
router.post("/bulk", validate(createKanjiBulkSchema), controller.createBulk);
router.post("/", validate(createKanjiSchema), controller.create);
router.get("/:id", controller.getById);
router.patch("/:id", validate(updateKanjiSchema), controller.update);
router.delete("/:id", controller.delete);
router.get("/sync", controller.sync);

export default router;
