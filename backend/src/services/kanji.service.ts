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
      throw new Error("Kanji not found");
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
      throw new Error("kanji_character is required");
    }

    const exists = await this.repository.findByCharacter(data.kanji_character);

    if (exists) {
      throw new AppError("  s Kanji đã tồn tại", 409, "KANJI_ALREADY_EXISTS");
    }

    const id = await this.repository.create(data);

    return this.repository.findById(id);
  }

  async createBulk(data: Kanji[]) {
    // Normalize
    const normalizedData = data.map((kanji) => ({
      ...kanji,
      kanji_character: kanji.kanji_character.trim(),
    }));
    // Create bulk
    const { created, skipped } =
      await this.repository.createBulk(normalizedData);
    // Build response
    return buildBulkResult(
      normalizedData.length,
      created.length,
      skipped.length,
      created,
      skipped,
      true,
    );
  }

  async update(id: number, data: Kanji) {
    await this.getById(id);

    await this.repository.update(id, data);

    return this.repository.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);

    return this.repository.delete(id);
  }

  async getUpdatedSince(date: Date) {
    return this.repository.findUpdatedSince(date);
  }
}
