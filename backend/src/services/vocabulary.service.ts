import { Vocabulary } from "../models/vocabulary.model";
import { VocabularyRepository } from "../repositories/vocabulary.respository";

export class VocabularyService {
  private repository = new VocabularyRepository();

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const data = await this.repository.findById(id);

    if (!data) {
      throw new Error("Vocabulary not found");
    }

    return data;
  }

  async search(keyword: string) {
    return this.repository.search(keyword);
  }

  async getByLesson(lessonId: number) {
    return this.repository.findByLesson(lessonId);
  }

  async create(data: Vocabulary) {
    if (!data.word) {
      throw new Error("word is required");
    }

    if (!data.reading) {
      throw new Error("reading is required");
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
