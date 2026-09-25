import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Vocabulary } from "../models/vocabulary.model";

export class VocabularyRepository {
  async findAll(): Promise<Vocabulary[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(`
            SELECT *
            FROM vocabulary
            WHERE deleted_at IS NULL
            ORDER BY id ASC
        `);

    return rows as Vocabulary[];
  }

  async findById(id: number) {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM vocabulary
            WHERE id = ? AND deleted_at IS NULL
            `,
      [id],
    );

    return rows.length ? (rows[0] as Vocabulary) : null;
  }

  async search(keyword: string) {
    const like = `%${keyword}%`;

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM vocabulary
            WHERE deleted_at IS NULL
                AND (
                    word LIKE ?
                    OR reading LIKE ?
                    OR meaning LIKE ?
                    OR han_viet LIKE ?
                )
            ORDER BY id ASC
            `,
      [like, like, like, like],
    );

    return rows as Vocabulary[];
  }

  async findByLesson(lessonId: number) {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM vocabulary
            WHERE lesson_id = ? AND deleted_at IS NULL
            ORDER BY id ASC
            `,
      [lessonId],
    );

    return rows as Vocabulary[];
  }

  async create(data: Vocabulary) {
    const [result] = await connect.execute<ResultSetHeader>(
      `
                INSERT INTO vocabulary (
                    word,
                    reading,
                    meaning,
                    han_viet,
                    part_of_speech,
                    jlpt_level_id,
                    audio_url,
                    example_sentence,
                    example_reading,
                    example_meaning,
                    lesson_id
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
      [
        data.word,
        data.reading,
        data.meaning ?? null,
        data.han_viet ?? null,
        data.part_of_speech ?? null,
        data.jlpt_level_id ?? null,
        data.audio_url ?? null,
        data.example_sentence ?? null,
        data.example_reading ?? null,
        data.example_meaning ?? null,
        data.lesson_id ?? null,
      ],
    );

    return result.insertId;
  }

  async update(id: number, data: Vocabulary) {
    const [result] = await connect.execute<ResultSetHeader>(
      `
                UPDATE vocabulary
                SET
                    word = ?,
                    reading = ?,
                    meaning = ?,
                    han_viet = ?,
                    part_of_speech = ?,
                    jlpt_level_id = ?,
                    audio_url = ?,
                    example_sentence = ?,
                    example_reading = ?,
                    example_meaning = ?,
                    lesson_id = ?
                WHERE id = ? AND deleted_at IS NULL
                `,
      [
        data.word,
        data.reading,
        data.meaning ?? null,
        data.han_viet ?? null,
        data.part_of_speech ?? null,
        data.jlpt_level_id ?? null,
        data.audio_url ?? null,
        data.example_sentence ?? null,
        data.example_reading ?? null,
        data.example_meaning ?? null,
        data.lesson_id ?? null,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number) {
    const [result] = await connect.execute<ResultSetHeader>(
      `
                UPDATE vocabulary
                SET deleted_at = NOW()
                WHERE id = ?
                AND deleted_at IS NULL
                `,
      [id],
    );

    return result.affectedRows > 0;
  }
}
