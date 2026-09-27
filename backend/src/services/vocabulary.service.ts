import { Vocabulary } from "../models/vocabulary.model";
import { VocabularyRepository } from "../repositories/vocabulary.repository";
import { AppError } from "../utils/AppError";

export class VocabularyService {
  private repository = new VocabularyRepository();

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const data = await this.repository.findById(id);

    if (!data) {
      throw new AppError("Vocabulary not found", 404, "VOCABULARY_NOT_FOUND");
    }

    return data;
  }

  async getByJlpt(levelId: number) {
    return this.repository.findByJlpt(levelId);
  }

  async search(keyword: string) {
    return this.repository.search(keyword);
  }

  async getByLesson(lessonId: number) {
    return this.repository.findByLesson(lessonId);
  }

  async create(data: Vocabulary) {
    if (!data.word?.trim()) {
      throw new AppError("word is required", 400, "VALIDATION_ERROR");
    }

    const id = await this.repository.create(data);
    return this.repository.findById(id);
  }

  async update(id: number, data: Vocabulary) {
    await this.getById(id);
    await this.repository.update(id, data);
    return this.repository.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    return this.repository.delete(id);
  }
}
