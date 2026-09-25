import { Grammar } from "../models/grammar.model";
import { GrammarRepository } from "../repositories/grammar.repository";
import { AppError } from "../utils/AppError";

export class GrammarService {
  private repository = new GrammarRepository();
  async getAll(page: number, limit: number) {
    return this.repository.findAll(page, limit);
  }

  async getById(id: number) {
    const data = await this.repository.findById(id);
    if (!data) {
      throw new AppError("Grammar không tồn tại", 404);
    }
    return data;
  }

  async search(keyword: string) {
    return this.repository.search(keyword);
  }

  async getByLesson(lessonId: number) {
    return this.repository.findByLesson(lessonId);
  }

  async create(data: Grammar) {
    const id = await this.repository.create(data);
    return this.repository.findById(id);
  }

  async update(id: number, data: Grammar) {
    await this.getById(id);
    await this.repository.update(id, data);
    return this.repository.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    return this.repository.delete(id);
  }
}
