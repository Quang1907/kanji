import { db } from "../database/db";
import type { LocalKanji } from "../models/kanji.model";

export class KanjiLocalRepository {
  async findAll(): Promise<LocalKanji[]> {
    return db.kanji.filter((kanji) => !kanji.deleted_at).toArray();
  }

  async findById(id: number): Promise<LocalKanji | undefined> {
    return db.kanji.get(id);
  }

  async findByCharacter(character: string): Promise<LocalKanji | undefined> {
    return db.kanji.where("kanji_character").equals(character).first();
  }

  async findByJlpt(jlptLevelId: number): Promise<LocalKanji[]> {
    return db.kanji
      .where("jlpt_level_id")
      .equals(jlptLevelId)
      .filter((kanji) => !kanji.deleted_at)
      .toArray();
  }

  async search(keyword: string): Promise<LocalKanji[]> {
    const normalized = keyword.trim().toLowerCase();

    return db.kanji
      .filter((kanji) => {
        if (kanji.deleted_at) {
          return false;
        }

        return (
          kanji.kanji_character.toLowerCase().includes(normalized) ||
          (kanji.meaning ?? "").toLowerCase().includes(normalized) ||
          (kanji.han_viet ?? "").toLowerCase().includes(normalized)
        );
      })
      .toArray();
  }

  async save(kanji: LocalKanji): Promise<void> {
    await db.kanji.put(kanji);
  }

  async saveBulk(kanji: LocalKanji[]): Promise<void> {
    await db.kanji.bulkPut(kanji);
  }

  async delete(id: number): Promise<void> {
    await db.kanji.delete(id);
  }

  async clear(): Promise<void> {
    await db.kanji.clear();
  }
}
