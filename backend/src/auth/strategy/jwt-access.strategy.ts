import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { User } from "@prisma/client";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service.js";
import $V from "../../util/variable.js";
import type { JwtPayload } from "../payload.js";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  "jwt-access"
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies["Authentication"], // get cookie with name "Authentication"
      ]),
      secretOrKey: $V.JWT.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${$V.JWT.ACCESS_TOKEN_EXPIRATION_TIME}s`,
      },
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user: User | null = await this.userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException("Access Failure");
    }
    // save into req.user
    return user;
  }
}
