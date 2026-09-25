import { Lesson } from "../models/lesson.model";
import { LessonRepository } from "../repositories/lesson.repository";

export class LessonService {
  private repository = new LessonRepository();
  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const data = await this.repository.findById(id);
    if (!data) {
      throw new Error("Lesson not found");
    }
    return data;
  }

  async getByLevel(level: string) {
    return this.repository.findByLevel(level);
  }

  async create(data: Lesson) {
    const id = await this.repository.create(data);
    return this.repository.findById(id);
  }

  async update(id: number, data: Lesson) {
    await this.getById(id);
    await this.repository.update(id, data);
    return this.repository.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    return this.repository.delete(id);
  }
}
