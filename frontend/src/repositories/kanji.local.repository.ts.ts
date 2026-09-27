import type { LocalKanji } from "@/models/kanji.local.model";
import { db } from "@/database/db";
export class KanjiLocalRepository {
  /**
   * =======================================================
   * SAVE ONE
   * =======================================================
   */
  async save(kanji: LocalKanji): Promise<void> {
    await db.kanji.put(kanji);
  }

  /**
   * =======================================================
   * SAVE MANY
   * =======================================================
   */
  async saveMany(kanjiList: LocalKanji[]): Promise<void> {
    if (!kanjiList.length) {
      return;
    }

    await db.kanji.bulkPut(kanjiList);
  }

  /**
   * =======================================================
   * GET BY ID
   * =======================================================
   */
  async getById(id: number): Promise<LocalKanji | undefined> {
    return db.kanji.get(id);
  }

  /**
   * =======================================================
   * GET ALL
   * =======================================================
   */
  async getAll(): Promise<LocalKanji[]> {
    return db.kanji.toArray();
  }

  /**
   * =======================================================
   * GET BY JLPT
   * =======================================================
   */
  async getByJlpt(levelId: number): Promise<LocalKanji[]> {
    return db.kanji.where("jlpt_level_id").equals(levelId).toArray();
  }

  /**
   * =======================================================
   * GET BY LESSON
   * =======================================================
   */
  async getByLesson(lessonId: number): Promise<LocalKanji[]> {
    return db.kanji.where("lesson_id").equals(lessonId).toArray();
  }

  /**
   * =======================================================
   * SEARCH
   *
   * IndexedDB không có LIKE giống MySQL.
   *
   * Vì vậy search local sẽ filter bằng JavaScript.
   * =======================================================
   */
  async search(keyword: string): Promise<LocalKanji[]> {
    const normalized = keyword.trim().toLowerCase();

    if (!normalized) {
      return this.getAll();
    }

    const all = await db.kanji.toArray();

    return all.filter((kanji) => {
      return (
        kanji.kanji_character?.toLowerCase().includes(normalized) ||
        kanji.han_viet?.toLowerCase().includes(normalized) ||
        kanji.meaning?.toLowerCase().includes(normalized) ||
        kanji.onyomi?.toLowerCase().includes(normalized) ||
        kanji.kunyomi?.toLowerCase().includes(normalized)
      );
    });
  }

  /**
   * =======================================================
   * COUNT
   * =======================================================
   */
  async count(): Promise<number> {
    return db.kanji.count();
  }

  /**
   * =======================================================
   * COUNT BY JLPT
   * =======================================================
   */
  async countByJlpt(levelId: number): Promise<number> {
    return db.kanji.where("jlpt_level_id").equals(levelId).count();
  }

  /**
   * =======================================================
   * DELETE
   * =======================================================
   */
  async delete(id: number): Promise<void> {
    await db.kanji.delete(id);
  }

  /**
   * =======================================================
   * DELETE MANY
   * =======================================================
   */
  async deleteMany(ids: number[]): Promise<void> {
    if (!ids.length) {
      return;
    }

    await db.kanji.bulkDelete(ids);
  }

  /**
   * =======================================================
   * CLEAR ALL
   * =======================================================
   *
   * Dùng khi user muốn xóa toàn bộ dữ liệu offline.
   */
  async clear(): Promise<void> {
    await db.kanji.clear();
  }
}
