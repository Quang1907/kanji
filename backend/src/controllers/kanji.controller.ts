import { NextFunction, Request, Response } from "express";
import { KanjiService } from "../services/kanji.service";

export class KanjiController {
  private service = new KanjiService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, jlpt_level_id } = req.query;
      let data;
      if (search) {
        data = await this.service.search(String(search));
      } else if (jlpt_level_id) {
        data = await this.service.getByJlpt(Number(jlpt_level_id));
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
      const id = Number(req.params.id);
      const data = await this.service.getById(id);
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
    } catch (error: any) {
      next(error);
    }
  };

  createBulk = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createBulk(req.body);

      res.status(201).json({
        success: true,
        message: "Import Kanji completed",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await this.service.update(id, req.body);
      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      res.json({
        success: true,
        message: "Kanji deleted",
      });
    } catch (error: any) {
      next(error);
    }
  };

  sync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedSince = req.query.updated_since;

      if (!updatedSince) {
        return res.status(400).json({
          success: false,
          message: "updated_since is required",
        });
      }

      const date = new Date(String(updatedSince));

      if (Number.isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: "updated_since must be a valid date",
        });
      }

      const data = await this.service.getUpdatedSince(date);

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
