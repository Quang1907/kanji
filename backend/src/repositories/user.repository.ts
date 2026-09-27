import { connect } from "../../../database/config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, SafeUser } from "../models/user.model";

export class UserRepository {
  async findById(id: number): Promise<User | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        id,
        username,
        email,
        password_hash,
        display_name,
        avatar_url,
        role,
        is_active,
        last_login_at,
        created_at,
        updated_at,
        deleted_at
      FROM users
      WHERE id = ? AND deleted_at IS NULL
      LIMIT 1
      `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        id,
        username,
        email,
        password_hash,
        display_name,
        avatar_url,
        role,
        is_active,
        last_login_at,
        created_at,
        updated_at,
        deleted_at
      FROM users
      WHERE email = ? AND deleted_at IS NULL
      LIMIT 1
      `,
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as User;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await connect.execute<RowDataPacket[]>(
      `
      SELECT
        id,
        username,
        email,
        password_hash,
        display_name,
        avatar_url,
        role,
        is_active,
        last_login_at,
        created_at,
        updated_at,
        deleted_at
      FROM users
      WHERE username = ? AND deleted_at IS NULL
      LIMIT 1
      `,
      [username]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as User;
  }

  async create(data: {
    username: string;
    email: string;
    password_hash: string;
    display_name?: string | null;
  }): Promise<number> {
    const [result] = await connect.execute<ResultSetHeader>(
      `
      INSERT INTO users (
        username,
        email,
        password_hash,
        display_name,
        role,
        is_active,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, 'user', 1, NOW(), NOW())
      `,
      [
        data.username,
        data.email,
        data.password_hash,
        data.display_name ?? data.username,
      ]
    );

    return result.insertId;
  }

  async updateLastLogin(id: number): Promise<void> {
    await connect.execute(
      `
      UPDATE users
      SET last_login_at = NOW()
      WHERE id = ?
      `,
      [id]
    );
  }
}
