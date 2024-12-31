import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import type { Response } from "express";
import { UserService } from "../user/user.service.js";
import $V from "../util/variable.js";
import { RegisterDto } from "./auth.dto.js";
import type { JwtPayload } from "./payload.js";

const cookieBase = {
  domain: $V.domain,
  sameSite: "none" as const,
  secure: true,
  httpOnly: true,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(userInfo: RegisterDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(userInfo.password, 10);
    const user = await this.userService.create({
      ...userInfo,
      password: hashedPassword,
    });
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const isValid: boolean = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async setCookie(
    res: Response,
    user: User,
    type: "access" | "refresh"
  ): Promise<void> {
    const payload: JwtPayload = { id: user.id };
    const isRefresh = type === "refresh";
    const secret = isRefresh
      ? $V.JWT.REFRESH_TOKEN_SECRET
      : $V.JWT.ACCESS_TOKEN_SECRET;
    const expiresIn = isRefresh
      ? $V.JWT.REFRESH_TOKEN_EXPIRATION_TIME
      : $V.JWT.ACCESS_TOKEN_EXPIRATION_TIME;
    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn: `${expiresIn}s`,
    });
    const name = isRefresh ? "Refresh" : "Authentication";
    res.cookie(name, token, {
      ...cookieBase,
      maxAge: Number(expiresIn) * 1000,
    });
    if (isRefresh) {
      await this.userService.setRefreshToken(user.id, token);
    }
  }

  async removeCookies(res: Response, user: User): Promise<void> {
    res.cookie("Authentication", "", { ...cookieBase, maxAge: 0 });
    res.cookie("Refresh", "", { ...cookieBase, maxAge: 0 });
    await this.userService.removeRefreshToken(user.id);
  }
}
