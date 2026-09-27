import { Kanji } from "../models/kanji.model";
import { KanjiRepository } from "../repositories/kanji.repository";
import { AppError } from "../utils/AppError";
import { buildBulkResult } from "../utils/helper";

export class KanjiService {
  private repository = new KanjiRepository();

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const kanji = await this.repository.findById(id);

    if (!kanji) {
      throw new AppError("Kanji not found", 404, "KANJI_NOT_FOUND");
    }

    return kanji;
  }

  async search(keyword: string) {
    return this.repository.search(keyword);
  }

  async getByJlpt(jlpt_level_id: number) {
    return this.repository.findByJlpt(jlpt_level_id);
  }

  async create(data: Kanji) {
    if (!data.kanji_character?.trim()) {
      throw new AppError("kanji_character is required", 400, "VALIDATION_ERROR");
    }

    const exists = await this.repository.findByCharacter(data.kanji_character);

    if (exists) {
      throw new AppError("Kanji đã tồn tại", 409, "KANJI_ALREADY_EXISTS");
    }

    const id = await this.repository.create(data);
    return this.repository.findById(id);
  }

  async createBulk(data: Kanji[]) {
    const normalizedData = data.map((kanji) => ({
      ...kanji,
      kanji_character: kanji.kanji_character.trim(),
    }));

    const { created, skipped } =
      await this.repository.createBulk(normalizedData);

    return buildBulkResult(
      normalizedData.length,
      created.length,
      skipped.length,
      created,
      skipped,
    );
  }

  async update(id: number, data: Kanji) {
    await this.getById(id);
    await this.repository.update(id, data);
    return this.repository.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.repository.delete(id);
    return true;
  }

  async getUpdatedSince(date: Date) {
    return this.repository.findUpdatedSince(date);
  }
}
