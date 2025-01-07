import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { User } from "@prisma/client";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import $V from "../../util/variable";
import type { JwtPayload } from "../payload";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies["Refresh"], // get cookie with name "Refresh"
      ]),
      secretOrKey: $V.JWT.REFRESH_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${$V.JWT.REFRESH_TOKEN_EXPIRATION_TIME}s`,
      },
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<User> {
    const refreshToken = req.cookies["Refresh"];
    const user: User | null =
      await this.usersService.getUserIfRefreshTokenMatches(
        payload.id,
        refreshToken
      );
    if (!user) {
      throw new UnauthorizedException("Refresh Failure");
    }
    // save into req.user
    return user;
  }
}
