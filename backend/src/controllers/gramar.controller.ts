import { NextFunction, Request, Response } from "express";
import { GrammarService } from "../services/grammar.service";

export class GrammarController {
  private service = new GrammarService();

  getAll = async (req: Request, res: Response) => {
    try {
      const { search, lesson } = req.query;
      let data;
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 20);

      if (search) {
        data = await this.service.search(String(search));
      } else if (lesson) {
        data = await this.service.getByLesson(Number(lesson));
      } else {
        data = await this.service.getAll(page, limit);
      }
      res.json({
        success: true,
        ...data,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: "Failed to fetch grammar",
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getById(Number(req.params.id));

      res.json({
        success: true,
        data,
      });
    } catch {
      res.status(404).json({
        success: false,
        message: "Grammar not found",
      });
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.create(req.body);

      res.status(201).json({
        success: true,
        data,
      });
    } catch (error: any) {
      next(error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.service.update(Number(req.params.id), req.body);

      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(Number(req.params.id));

      res.json({
        success: true,
        message: "Grammar deleted",
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };
}
