import { Request, Response, NextFunction } from "express";
import { LearningService } from "../services/learning.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class LearningController {
  private service = new LearningService();

  sync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = Number(
        authReq.user?.id ?? req.body.payload?.progress?.user_id
      );

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User authentication required",
        });
      }

      const result = await this.service.sync(userId, req.body);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
