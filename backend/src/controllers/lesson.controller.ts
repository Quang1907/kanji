import { Request, Response, NextFunction } from "express";
import { LessonService } from "../services/lesson.service";

export class LessonController {
  private service = new LessonService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { level } = req.query;

      const data = level
        ? await this.service.getByLevel(String(level))
        : await this.service.getAll();

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
        message: "Lesson deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}
