export interface User {
  id: number;
  username: string;
  email: string | null;
  password_hash: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  is_active: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type SafeUser = Omit<User, "password_hash">;
