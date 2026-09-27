import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Lesson } from "../models/lesson.model";

export class LessonRepository {
  async findAll(): Promise<Lesson[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(`
      SELECT
        les.id,
        les.level_id,
        l.code AS level_code,
        les.lesson_number,
        les.title,
        les.title_hiragana,
        les.description,
        les.objectives,
        les.content,
        les.thumbnail_url,
        les.estimated_minutes,
        les.is_published,
        les.created_at,
        les.updated_at,
        les.deleted_at
      FROM lessons les
      LEFT JOIN levels l ON l.id = les.level_id
      WHERE les.deleted_at IS NULL
      ORDER BY les.level_id ASC, les.lesson_number ASC
    `);

    return rows as Lesson[];
  }

  async findById(id: number): Promise<Lesson | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        les.id,
        les.level_id,
        l.code AS level_code,
        les.lesson_number,
        les.title,
        les.title_hiragana,
        les.description,
        les.objectives,
        les.content,
        les.thumbnail_url,
        les.estimated_minutes,
        les.is_published,
        les.created_at,
        les.updated_at,
        les.deleted_at
      FROM lessons les
      LEFT JOIN levels l ON l.id = les.level_id
      WHERE les.id = ? AND les.deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return rows.length ? (rows[0] as Lesson) : null;
  }

  async findByLevel(level: string | number): Promise<Lesson[]> {
    const isNumeric = !isNaN(Number(level));

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        les.id,
        les.level_id,
        l.code AS level_code,
        les.lesson_number,
        les.title,
        les.title_hiragana,
        les.description,
        les.objectives,
        les.content,
        les.thumbnail_url,
        les.estimated_minutes,
        les.is_published,
        les.created_at,
        les.updated_at,
        les.deleted_at
      FROM lessons les
      LEFT JOIN levels l ON l.id = les.level_id
      WHERE les.deleted_at IS NULL
        AND (${isNumeric ? "les.level_id = ?" : "l.code = ?"})
      ORDER BY les.lesson_number ASC
      `,
      [String(level)],
    );

    return rows as Lesson[];
  }

  async create(data: Lesson): Promise<number> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      INSERT INTO lessons (
        level_id,
        lesson_number,
        title,
        title_hiragana,
        description,
        objectives,
        content,
        thumbnail_url,
        estimated_minutes,
        is_published,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [
        data.level_id,
        data.lesson_number,
        data.title,
        data.title_hiragana ?? null,
        data.description ?? null,
        data.objectives ?? null,
        data.content ?? null,
        data.thumbnail_url ?? null,
        data.estimated_minutes ?? 30,
        data.is_published ?? true,
      ],
    );

    return result.insertId;
  }

  async update(id: number, data: Lesson): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      UPDATE lessons
      SET
        level_id = COALESCE(?, level_id),
        lesson_number = COALESCE(?, lesson_number),
        title = COALESCE(?, title),
        title_hiragana = ?,
        description = ?,
        objectives = ?,
        content = ?,
        thumbnail_url = ?,
        estimated_minutes = ?,
        is_published = COALESCE(?, is_published),
        updated_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
      `,
      [
        data.level_id ?? null,
        data.lesson_number ?? null,
        data.title ?? null,
        data.title_hiragana ?? null,
        data.description ?? null,
        data.objectives ?? null,
        data.content ?? null,
        data.thumbnail_url ?? null,
        data.estimated_minutes ?? null,
        data.is_published ?? null,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      UPDATE lessons
      SET deleted_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
      `,
      [id],
    );

    return result.affectedRows > 0;
  }
}
