import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Kanji } from "../models/kanji.model";

export class KanjiRepository {
  async findAll(): Promise<Kanji[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(`
          SELECT
          k.id,
          k.kanji_character,
          k.han_viet,
          k.meaning,
          k.onyomi,
          k.kunyomi,
          k.strokes,
          k.radical,
          k.grade,
          l.code AS jlpt_level_id,

          k.mnemonic,
          k.stroke_paths,
          k.lesson_id,

          k.created_at,
          k.updated_at,
          k.deleted_at

        FROM kanji k

        LEFT JOIN levels l
          ON l.id = k.jlpt_level_id
          WHERE k.deleted_at IS NULL
        ORDER BY k.id ASC
        `);

    return rows as Kanji[];
  }

  async findById(id: number): Promise<Kanji | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM kanji
            WHERE id = ?
             AND deleted_at IS NULL
            LIMIT 1
            `,
      [id],
    );

    return rows.length > 0 ? (rows[0] as Kanji) : null;
  }

  async findByCharacter(kanji_character: string): Promise<Kanji | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM kanji
            WHERE kanji_character = ?
              AND deleted_at IS NULL
            LIMIT 1
            `,
      [kanji_character],
    );

    return rows.length > 0 ? (rows[0] as Kanji) : null;
  }

  async search(keyword: string): Promise<Kanji[]> {
    const like = `%${keyword}%`;

    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM kanji
            WHERE
                kanji_character LIKE ?
                OR han_viet LIKE ?
                OR meaning LIKE ?
                OR onyomi LIKE ?
                OR kunyomi LIKE ?
            AND deleted_at IS NULL
            ORDER BY id ASC
            `,
      [like, like, like, like, like],
    );

    return rows as Kanji[];
  }

  async findByJlpt(jlpt_level_id: number): Promise<Kanji[]> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM kanji
            WHERE jlpt_level_id = ?
            AND deleted_at IS NULL
            ORDER BY id ASC
            `,
      [jlpt_level_id],
    );

    return rows as Kanji[];
  }

  async create(data: Kanji): Promise<number> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      INSERT INTO kanji (
        kanji_character,
        han_viet,
        meaning,
        onyomi,
        kunyomi,
        strokes,
        radical,
        grade,
        jlpt_level_id,
        mnemonic,
        stroke_paths,
        lesson_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        data.kanji_character,
        data.han_viet ?? null,
        data.meaning ?? null,
        data.onyomi ?? null,
        data.kunyomi ?? null,
        data.strokes ?? null,
        data.radical ?? null,
        data.grade ?? null,
        data.jlpt_level_id ?? null,
        data.mnemonic ?? null,
        data.stroke_paths ?? null,
        data.lesson_id ?? null,
      ],
    );

    return result.insertId;
  }

  async update(id: number, data: Kanji): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
            UPDATE kanji
            SET
                kanji_character = ?,
                han_viet = ?,
                meaning = ?,
                onyomi = ?,
                kunyomi = ?,
                strokes = ?,
                radical = ?,
                jlpt_level_id = ?,
                mnemonic = ?,
                stroke_paths = ?
            WHERE id = ?
            AND deleted_at IS NULL
            `,
      [
        data.kanji_character,
        data.han_viet ?? null,
        data.meaning ?? null,
        data.onyomi ?? null,
        data.kunyomi ?? null,
        data.strokes ?? null,
        data.radical ?? null,
        data.jlpt_level_id ?? null,
        data.mnemonic ?? null,
        data.stroke_paths ?? null,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
            UPDATE kanji
            SET deleted_at = NOW()
            WHERE id = ?
            AND deleted_at IS NULL
            `,
      [id],
    );

    return result.affectedRows > 0;
  }
  async createBulk(data: Kanji[]): Promise<{
    created: Kanji[];
    skipped: Kanji[];
  }> {
    if (!data.length) {
      return {
        created: [],
        skipped: [],
      };
    }

    const connection = await connect.getConnection();

    try {
      // =====================================================
      // 1. Normalize
      // =====================================================
      const normalizedData = data.map((item) => ({
        ...item,
        kanji_character: item.kanji_character.trim(),
      }));

      // =====================================================
      // 2. Remove duplicate trong cùng request
      //
      // Ví dụ:
      // ["日", "日", "月"]
      //
      // chỉ insert:
      // ["日", "月"]
      //
      // Nhưng normalizedData vẫn giữ duplicate để tính skipped.
      // =====================================================
      const uniqueData = Array.from(
        new Map(
          normalizedData.map((item) => [item.kanji_character, item]),
        ).values(),
      );

      const characters = uniqueData.map((item) => item.kanji_character);

      const placeholders = characters.map(() => "?").join(",");

      // =====================================================
      // 3. Transaction
      // =====================================================
      await connection.beginTransaction();

      // =====================================================
      // 4. LOCK những character cần xử lý
      //
      // FOR UPDATE rất quan trọng.
      //
      // Request A:
      //   SELECT "日" FOR UPDATE
      //
      // Request B:
      //   SELECT "日" FOR UPDATE
      //
      // B sẽ phải chờ A commit.
      //
      // Vì vậy B không thể đồng thời quyết định rằng
      // "日" chưa tồn tại.
      // =====================================================
      const [existingRows] = await connection.execute<RowDataPacket[]>(
        `
          SELECT
            id,
            kanji_character
          FROM kanji
          WHERE kanji_character IN (${placeholders})
          ORDER BY kanji_character
          FOR UPDATE
        `,
        characters,
      );

      const existing = existingRows as Pick<Kanji, "id" | "kanji_character">[];

      const existingCharacters = new Set(
        existing.map((item) => item.kanji_character),
      );

      // =====================================================
      // 5. Xác định record request này được phép tạo
      // =====================================================
      const newData = uniqueData.filter(
        (item) => !existingCharacters.has(item.kanji_character),
      );

      let created: Kanji[] = [];

      // =====================================================
      // 6. Bulk INSERT
      // =====================================================
      if (newData.length > 0) {
        const values = newData
          .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
          .join(", ");

        const params = newData.flatMap((item) => [
          item.kanji_character,
          item.han_viet ?? null,
          item.meaning ?? null,
          item.onyomi ?? null,
          item.kunyomi ?? null,
          item.strokes ?? null,
          item.radical ?? null,
          item.grade ?? null,
          item.jlpt_level_id ?? null,
          item.mnemonic ?? null,
          item.stroke_paths ?? null,
          item.lesson_id ?? null,
        ]);

        await connection.execute<ResultSetHeader>(
          `
          INSERT INTO kanji (
            kanji_character,
            han_viet,
            meaning,
            onyomi,
            kunyomi,
            strokes,
            radical,
            grade,
            jlpt_level_id,
            mnemonic,
            stroke_paths,
            lesson_id
          )
          VALUES ${values}
        `,
          params,
        );

        // ===================================================
        // 7. Lấy chính những record request này vừa tạo
        //
        // Vì các character đã được lock ở bước 4 nên
        // request khác không thể chen vào tạo cùng character
        // trong khoảng thời gian transaction này.
        // ===================================================
        const newCharacters = newData.map((item) => item.kanji_character);

        const newPlaceholders = newCharacters.map(() => "?").join(",");

        const [createdRows] = await connection.execute<RowDataPacket[]>(
          `
            SELECT *
            FROM kanji
            WHERE kanji_character IN (${newPlaceholders})
              AND deleted_at IS NULL
            ORDER BY id ASC
          `,
          newCharacters,
        );

        created = createdRows as Kanji[];
      }

      // =====================================================
      // 8. SKIPPED
      //
      // Dùng normalizedData để duplicate trong request
      // cũng được tính.
      // =====================================================
      const createdCharacters = new Set(
        created.map((item) => item.kanji_character),
      );

      const skipped = normalizedData.filter(
        (item) => !createdCharacters.has(item.kanji_character),
      );

      // =====================================================
      // 9. Commit
      // =====================================================
      await connection.commit();

      return {
        created,
        skipped,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async findUpdatedSince(date: Date) {
    const [rows] = await connect.execute(
      `
      SELECT *
      FROM kanji
      WHERE updated_at > ?
         OR deleted_at > ?
      ORDER BY updated_at ASC
      `,
      [date, date],
    );

    return rows;
  }
}
