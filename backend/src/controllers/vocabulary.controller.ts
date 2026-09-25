import { Request, Response, NextFunction } from "express";

import { VocabularyService } from "../services/vocabulary.service";

export class VocabularyController {
  private service = new VocabularyService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, lesson } = req.query;

      let data;

      if (search) {
        data = await this.service.search(String(search));
      } else if (lesson) {
        data = await this.service.getByLesson(Number(lesson));
      } else {
        data = await this.service.getAll();
      }

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getById(Number(req.params.id));

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.create(req.body);

      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.update(Number(req.params.id), req.body);

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(Number(req.params.id));

      res.json({
        success: true,
        message: "Vocabulary deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}
