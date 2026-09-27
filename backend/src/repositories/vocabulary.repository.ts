import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Vocabulary } from "../models/vocabulary.model";

export class VocabularyRepository {
  async findAll(): Promise<Vocabulary[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(`
      SELECT
        v.id,
        v.word,
        vr.reading,
        vr.romaji,
        v.word_type,
        v.meaning,
        v.han_viet,
        v.jlpt_level_id,
        l.code AS jlpt_level_code,
        v.frequency,
        v.pitch_accent,
        v.audio_url,
        v.image_url,
        v.notes,
        v.created_at,
        v.updated_at,
        v.deleted_at
      FROM vocabulary v
      LEFT JOIN vocabulary_readings vr ON vr.vocabulary_id = v.id AND vr.deleted_at IS NULL
      LEFT JOIN levels l ON l.id = v.jlpt_level_id
      WHERE v.deleted_at IS NULL
      ORDER BY v.id ASC
    `);

    return rows as Vocabulary[];
  }

  async findById(id: number): Promise<Vocabulary | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        v.id,
        v.word,
        vr.reading,
        vr.romaji,
        v.word_type,
        v.meaning,
        v.han_viet,
        v.jlpt_level_id,
        l.code AS jlpt_level_code,
        v.frequency,
        v.pitch_accent,
        v.audio_url,
        v.image_url,
        v.notes,
        v.created_at,
        v.updated_at,
        v.deleted_at
      FROM vocabulary v
      LEFT JOIN vocabulary_readings vr ON vr.vocabulary_id = v.id AND vr.deleted_at IS NULL
      LEFT JOIN levels l ON l.id = v.jlpt_level_id
      WHERE v.id = ? AND v.deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return rows.length ? (rows[0] as Vocabulary) : null;
  }

  async findByJlpt(levelId: number): Promise<Vocabulary[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        v.id,
        v.word,
        vr.reading,
        vr.romaji,
        v.word_type,
        v.meaning,
        v.han_viet,
        v.jlpt_level_id,
        l.code AS jlpt_level_code,
        v.frequency,
        v.pitch_accent,
        v.audio_url,
        v.image_url,
        v.notes,
        v.created_at,
        v.updated_at,
        v.deleted_at
      FROM vocabulary v
      LEFT JOIN vocabulary_readings vr ON vr.vocabulary_id = v.id AND vr.deleted_at IS NULL
      LEFT JOIN levels l ON l.id = v.jlpt_level_id
      WHERE v.jlpt_level_id = ? AND v.deleted_at IS NULL
      ORDER BY v.id ASC
      `,
      [levelId],
    );

    return rows as Vocabulary[];
  }

  async search(keyword: string): Promise<Vocabulary[]> {
    const like = `%${keyword}%`;

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        v.id,
        v.word,
        vr.reading,
        vr.romaji,
        v.word_type,
        v.meaning,
        v.han_viet,
        v.jlpt_level_id,
        l.code AS jlpt_level_code,
        v.frequency,
        v.pitch_accent,
        v.audio_url,
        v.image_url,
        v.notes,
        v.created_at,
        v.updated_at,
        v.deleted_at
      FROM vocabulary v
      LEFT JOIN vocabulary_readings vr ON vr.vocabulary_id = v.id AND vr.deleted_at IS NULL
      LEFT JOIN levels l ON l.id = v.jlpt_level_id
      WHERE v.deleted_at IS NULL
        AND (
          v.word LIKE ?
          OR vr.reading LIKE ?
          OR v.meaning LIKE ?
          OR v.han_viet LIKE ?
        )
      ORDER BY v.id ASC
      `,
      [like, like, like, like],
    );

    return rows as Vocabulary[];
  }

  async findByLesson(lessonId: number): Promise<Vocabulary[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        v.id,
        v.word,
        vr.reading,
        vr.romaji,
        v.word_type,
        v.meaning,
        v.han_viet,
        v.jlpt_level_id,
        l.code AS jlpt_level_code,
        v.frequency,
        v.pitch_accent,
        v.audio_url,
        v.image_url,
        v.notes,
        v.created_at,
        v.updated_at,
        v.deleted_at
      FROM vocabulary v
      INNER JOIN lesson_vocab lv ON lv.vocabulary_id = v.id
      LEFT JOIN vocabulary_readings vr ON vr.vocabulary_id = v.id AND vr.deleted_at IS NULL
      LEFT JOIN levels l ON l.id = v.jlpt_level_id
      WHERE lv.lesson_id = ? AND v.deleted_at IS NULL
      ORDER BY lv.order_index ASC, v.id ASC
      `,
      [lessonId],
    );

    return rows as Vocabulary[];
  }

  async create(data: Vocabulary): Promise<number> {
    const connection = await connect.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute<ResultSetHeader>(
        `
        INSERT INTO vocabulary (
          word,
          word_type,
          meaning,
          han_viet,
          jlpt_level_id,
          audio_url,
          notes,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `,
        [
          data.word,
          data.word_type ?? null,
          data.meaning ?? null,
          data.han_viet ?? null,
          data.jlpt_level_id ?? null,
          data.audio_url ?? null,
          data.notes ?? null,
        ],
      );

      const vocabId = result.insertId;

      if (data.reading) {
        await connection.execute(
          `
          INSERT INTO vocabulary_readings (
            vocabulary_id,
            reading,
            romaji,
            created_at
          )
          VALUES (?, ?, ?, NOW())
          `,
          [vocabId, data.reading, data.romaji ?? null],
        );
      }

      await connection.commit();
      return vocabId;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async update(id: number, data: Vocabulary): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      UPDATE vocabulary
      SET
        word = ?,
        word_type = ?,
        meaning = ?,
        han_viet = ?,
        jlpt_level_id = ?,
        audio_url = ?,
        notes = ?,
        updated_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
      `,
      [
        data.word,
        data.word_type ?? null,
        data.meaning ?? null,
        data.han_viet ?? null,
        data.jlpt_level_id ?? null,
        data.audio_url ?? null,
        data.notes ?? null,
        id,
      ],
    );

    if (data.reading) {
      await connect.execute(
        `
        UPDATE vocabulary_readings
        SET reading = ?, romaji = ?
        WHERE vocabulary_id = ? AND deleted_at IS NULL
        `,
        [data.reading, data.romaji ?? null, id],
      );
    }

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      UPDATE vocabulary
      SET deleted_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
      `,
      [id],
    );

    return result.affectedRows > 0;
  }
}
