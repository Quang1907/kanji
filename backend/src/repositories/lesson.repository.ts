import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Lesson } from "../models/lesson.model";

export class LessonRepository {
  async findAll() {
    const [rows] = await connect.execute<RowDataPacket[]>(`
                SELECT * FROM lessons
                WHERE deleted_at IS NULL
                ORDER BY level, lesson_number
    `);

    return rows as Lesson[];
  }

  async findById(id: number) {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
                SELECT *
                FROM lessons
                WHERE id = ?
                AND deleted_at IS NULL
                `,
      [id],
    );

    return rows.length ? (rows[0] as Lesson) : null;
  }

  async findByLevel(level: string) {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
                SELECT *
                FROM lessons
                WHERE level = ?
                AND deleted_at IS NULL
                ORDER BY lesson_number
                `,
      [level],
    );

    return rows as Lesson[];
  }

  async create(
    data: Lesson,
    kanjiIds: number[] = [],
    vocabularyIds: number[] = [],
  ) {
    const connection = await connect.getConnection();

    try {
      await connection.beginTransaction();

      // 1. Create lesson
      const [lessonResult] = await connection.execute<ResultSetHeader>(
        `
                    INSERT INTO lessons(
                        level, lesson_number, title, title_japanese, 
                        description, objectives, image_url, audio_url)
                    VALUES(
                        ?, ?, ?, ?, ?, ?, ?, ?)
                    `,
        [
          data.level,
          data.lesson_number,
          data.title,
          data.title_japanese ?? null,
          data.description ?? null,
          data.objectives ?? null,
          data.image_url ?? null,
          data.audio_url ?? null,
        ],
      );

      const lessonId = lessonResult.insertId;

      // 2. Insert lesson - kanji
      for (const kanjiId of kanjiIds) {
        await connection.execute(
          `
                    INSERT INTO lesson_kanji(lesson_id, kanji_id)
                    VALUES(?, ?)
                    `,
          [lessonId, kanjiId],
        );
      }

      // 3. Insert lesson - vocabulary
      for (const vocabularyId of vocabularyIds) {
        await connection.execute(
          `
                    INSERT INTO lesson_vocabulary(lesson_id, vocabulary_id)
                    VALUES(?, ?)
                    `,
          [lessonId, vocabularyId],
        );
      }

      // 4. Commit
      await connection.commit();

      return lessonId;
    } catch (error) {
      // Có lỗi ở bất kỳ bước nào
      // => rollback toàn bộ
      await connection.rollback();

      throw error;
    } finally {
      // Luôn trả connection về pool
      connection.release();
    }
  }

  async update(id: number, data: Lesson) {
    const [result] = await connect.execute<ResultSetHeader>(
      `
                UPDATE lessons
                SET level = ?, lesson_number = ?, title = ?, title_japanese = ?,
                description = ?, objectives = ?, image_url = ?, audio_url = ?
                WHERE id = ? AND deleted_at IS NULL
                `,
      [
        data.level,
        data.lesson_number,
        data.title,
        data.title_japanese ?? null,
        data.description ?? null,
        data.objectives ?? null,
        data.image_url ?? null,
        data.audio_url ?? null,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number) {
    const [result] = await connect.execute<ResultSetHeader>(
      `
                UPDATE lessons
                SET deleted_at = NOW()
                WHERE id = ?
                AND deleted_at IS NULL
                `,
      [id],
    );

    return result.affectedRows > 0;
  }
}
