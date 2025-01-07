import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { User } from "@prisma/client";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Socket } from "socket.io";
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
        /** @description Custom extractor for both HTTP and WebSockets */
        /** @description Get cookie with name Authentication */
        (request: Request | Socket) => {
          if ("cookies" in request) {
            // HTTP request
            return request.cookies["Authentication"];
          } else if ("handshake" in request) {
            // WebSocket handshake
            const cookieHeader = request.handshake.headers.cookie;
            if (!cookieHeader) return null;
            const token = cookieHeader
              .split("; ")
              .find((cookie) => cookie.startsWith("Authentication="))
              ?.split("=")[1];
            return token || null;
          }
          return null;
        },
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
