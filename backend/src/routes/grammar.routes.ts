import { Router } from "express";
import { GrammarController } from "../controllers/gramar.controller";
import { createGrammarSchema, updateGrammarSchema } from "../dto/gammar.dto";
import { validate } from "../middleware/validate.middleware";

const router = Router();

const controller = new GrammarController();
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(createGrammarSchema), controller.create);
router.put("/:id", validate(updateGrammarSchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
