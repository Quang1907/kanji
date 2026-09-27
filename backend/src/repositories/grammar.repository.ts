import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Grammar } from "../models/grammar.model";

export class GrammarRepository {
  async findAll(page = 1, limit = 20): Promise<{
    data: Grammar[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const offset = Math.max(0, (page - 1) * limit);

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        g.id,
        g.title,
        g.pattern,
        g.pattern_short,
        g.meaning,
        g.explanation,
        g.usage_notes,
        g.formation,
        g.level_id,
        l.code AS jlpt_level_code,
        g.difficulty,
        g.mnemonic,
        g.notes,
        g.created_at,
        g.updated_at,
        g.deleted_at
      FROM grammar_patterns g
      LEFT JOIN levels l ON l.id = g.level_id
      WHERE g.deleted_at IS NULL
      ORDER BY g.id ASC
      LIMIT ? OFFSET ?
      `,
      [String(limit), String(offset)],
    );

    const [countRows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM grammar_patterns
      WHERE deleted_at IS NULL
      `,
    );

    const total = Number(countRows[0]?.total ?? 0);

    return {
      data: rows as Grammar[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findById(id: number): Promise<Grammar | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        g.id,
        g.title,
        g.pattern,
        g.pattern_short,
        g.meaning,
        g.explanation,
        g.usage_notes,
        g.formation,
        g.level_id,
        l.code AS jlpt_level_code,
        g.difficulty,
        g.mnemonic,
        g.notes,
        g.created_at,
        g.updated_at,
        g.deleted_at
      FROM grammar_patterns g
      LEFT JOIN levels l ON l.id = g.level_id
      WHERE g.id = ? AND g.deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return rows.length ? (rows[0] as Grammar) : null;
  }

  async findByJlpt(levelId: number): Promise<Grammar[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        g.id,
        g.title,
        g.pattern,
        g.pattern_short,
        g.meaning,
        g.explanation,
        g.usage_notes,
        g.formation,
        g.level_id,
        l.code AS jlpt_level_code,
        g.difficulty,
        g.mnemonic,
        g.notes,
        g.created_at,
        g.updated_at,
        g.deleted_at
      FROM grammar_patterns g
      LEFT JOIN levels l ON l.id = g.level_id
      WHERE g.level_id = ? AND g.deleted_at IS NULL
      ORDER BY g.id ASC
      `,
      [levelId],
    );

    return rows as Grammar[];
  }

  async search(keyword: string): Promise<Grammar[]> {
    const like = `%${keyword}%`;

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        g.id,
        g.title,
        g.pattern,
        g.pattern_short,
        g.meaning,
        g.explanation,
        g.usage_notes,
        g.formation,
        g.level_id,
        l.code AS jlpt_level_code,
        g.difficulty,
        g.mnemonic,
        g.notes,
        g.created_at,
        g.updated_at,
        g.deleted_at
      FROM grammar_patterns g
      LEFT JOIN levels l ON l.id = g.level_id
      WHERE g.deleted_at IS NULL
        AND (
          g.title LIKE ?
          OR g.pattern LIKE ?
          OR g.pattern_short LIKE ?
          OR g.meaning LIKE ?
          OR g.explanation LIKE ?
        )
      ORDER BY g.id ASC
      `,
      [like, like, like, like, like],
    );

    return rows as Grammar[];
  }

  async findByLesson(lessonId: number): Promise<Grammar[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        g.id,
        g.title,
        g.pattern,
        g.pattern_short,
        g.meaning,
        g.explanation,
        g.usage_notes,
        g.formation,
        g.level_id,
        l.code AS jlpt_level_code,
        g.difficulty,
        g.mnemonic,
        g.notes,
        g.created_at,
        g.updated_at,
        g.deleted_at
      FROM grammar_patterns g
      INNER JOIN lesson_grammar lg ON lg.grammar_id = g.id
      LEFT JOIN levels l ON l.id = g.level_id
      WHERE lg.lesson_id = ? AND g.deleted_at IS NULL
      ORDER BY lg.order_index ASC, g.id ASC
      `,
      [lessonId],
    );

    return rows as Grammar[];
  }

  async create(data: Grammar): Promise<number> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      INSERT INTO grammar_patterns (
        title,
        pattern,
        pattern_short,
        meaning,
        explanation,
        usage_notes,
        formation,
        level_id,
        difficulty,
        mnemonic,
        notes,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [
        data.title,
        data.pattern,
        data.pattern_short ?? null,
        data.meaning,
        data.explanation ?? null,
        data.usage_notes ?? null,
        data.formation ?? null,
        data.level_id ?? null,
        data.difficulty ?? 1,
        data.mnemonic ?? null,
        data.notes ?? null,
      ],
    );

    return result.insertId;
  }

  async update(id: number, data: Grammar): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      UPDATE grammar_patterns
      SET
        title = COALESCE(?, title),
        pattern = COALESCE(?, pattern),
        pattern_short = ?,
        meaning = COALESCE(?, meaning),
        explanation = ?,
        usage_notes = ?,
        formation = ?,
        level_id = ?,
        difficulty = COALESCE(?, difficulty),
        mnemonic = ?,
        notes = ?,
        updated_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
      `,
      [
        data.title ?? null,
        data.pattern ?? null,
        data.pattern_short ?? null,
        data.meaning ?? null,
        data.explanation ?? null,
        data.usage_notes ?? null,
        data.formation ?? null,
        data.level_id ?? null,
        data.difficulty ?? null,
        data.mnemonic ?? null,
        data.notes ?? null,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      UPDATE grammar_patterns
      SET deleted_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
      `,
      [id],
    );

    return result.affectedRows > 0;
  }
}
