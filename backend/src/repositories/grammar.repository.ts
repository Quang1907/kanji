import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Grammar } from "../models/grammar.model";

export class GrammarRepository {
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
        SELECT *
        FROM grammar
        WHERE deleted_at IS NULL
        ORDER BY id ASC
        LIMIT ? OFFSET ?
      `,
      [limit, offset],
    );

    const [countRows] = await connect.execute<RowDataPacket[]>(
      `
        SELECT COUNT(*) AS total
        FROM grammar
        WHERE deleted_at IS NULL
      `,
    );

    const total = Number(countRows[0].total);

    return {
      data: rows as Grammar[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number): Promise<Grammar | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
        SELECT *
        FROM grammar
        WHERE id = ?
          AND deleted_at IS NULL
        LIMIT 1
      `,
      [id],
    );

    return rows.length ? (rows[0] as Grammar) : null;
  }

  async search(keyword: string): Promise<Grammar[]> {
    const like = `%${keyword}%`;

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
        SELECT *
        FROM grammar
        WHERE deleted_at IS NULL
          AND (
            pattern LIKE ?
            OR title LIKE ?
            OR meaning LIKE ?
            OR explanation LIKE ?
            OR formation LIKE ?
            OR example_sentence LIKE ?
            OR example_reading LIKE ?
            OR example_meaning LIKE ?
          )
        ORDER BY id ASC
      `,
      [like, like, like, like, like, like, like, like],
    );

    return rows as Grammar[];
  }

  async findByLesson(lessonId: number): Promise<Grammar[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
        SELECT *
        FROM grammar
        WHERE lesson_id = ?
          AND deleted_at IS NULL
        ORDER BY id ASC
      `,
      [lessonId],
    );

    return rows as Grammar[];
  }

  async create(data: Grammar): Promise<number> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
        INSERT INTO grammar (
          pattern,
          title,
          meaning,
          explanation,
          formation,
          jlpt_level_id,
          example_sentence,
          example_reading,
          example_meaning,
          lesson_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.pattern,
        data.title ?? null,
        data.meaning ?? null,
        data.explanation ?? null,
        data.formation ?? null,
        data.jlpt_level_id ?? null,
        data.example_sentence ?? null,
        data.example_reading ?? null,
        data.example_meaning ?? null,
        data.lesson_id ?? null,
      ],
    );

    return result.insertId;
  }

  async update(id: number, data: Grammar): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
        UPDATE grammar
        SET
          pattern = ?,
          title = ?,
          meaning = ?,
          explanation = ?,
          formation = ?,
          jlpt_level_id = ?,
          example_sentence = ?,
          example_reading = ?,
          example_meaning = ?,
          lesson_id = ?
        WHERE id = ?
          AND deleted_at IS NULL
      `,
      [
        data.pattern,
        data.title ?? null,
        data.meaning ?? null,
        data.explanation ?? null,
        data.formation ?? null,
        data.jlpt_level_id ?? null,
        data.example_sentence ?? null,
        data.example_reading ?? null,
        data.example_meaning ?? null,
        data.lesson_id ?? null,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
        UPDATE grammar
        SET deleted_at = NOW()
        WHERE id = ?
          AND deleted_at IS NULL
      `,
      [id],
    );

    return result.affectedRows > 0;
  }
}
