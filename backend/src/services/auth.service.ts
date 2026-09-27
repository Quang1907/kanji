import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { RegisterDTO, LoginDTO } from "../dto/auth.dto";
import { AppError } from "../utils/AppError";

const JWT_SECRET =
  process.env.JWT_SECRET || "dev_secret_key_japanese_learning_2026_x89";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface AuthResponseUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResult {
  user: AuthResponseUser;
  accessToken: string;
}

export class AuthService {
  private userRepository = new UserRepository();

  private generateToken(payload: { id: number; email: string; role: string }): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  async register(dto: RegisterDTO): Promise<AuthResult> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new AppError("Email already in use", 409, "EMAIL_EXISTS");
    }

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new AppError("Username already in use", 409, "USERNAME_EXISTS");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(dto.password, salt);

    const userId = await this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password_hash,
      display_name: dto.displayName ?? dto.username,
    });

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Failed to create user", 500, "USER_CREATION_FAILED");
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email ?? "",
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email ?? "",
        name: user.display_name || user.username,
        role: user.role,
      },
      accessToken: token,
    };
  }

  async login(dto: LoginDTO): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user || !user.password_hash) {
      throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    if (!user.is_active) {
      throw new AppError("Account is inactive", 403, "ACCOUNT_INACTIVE");
    }

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    await this.userRepository.updateLastLogin(user.id);

    const token = this.generateToken({
      id: user.id,
      email: user.email ?? "",
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email ?? "",
        name: user.display_name || user.username,
        role: user.role,
      },
      accessToken: token,
    };
  }

  async getMe(userId: number): Promise<AuthResponseUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    return {
      id: user.id,
      email: user.email ?? "",
      name: user.display_name || user.username,
      role: user.role,
    };
  }
}
