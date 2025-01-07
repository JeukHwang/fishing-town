import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { User } from "@prisma/client";
import type { Response } from "express";
import { CurrentUser } from "../user/user.decorator";
import { UserProfile, toUserProfile } from "../user/user.service";
import { Public } from "./auth.decorator";
import { RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { JwtRefreshGuard } from "./guard/jwt-refresh.guard";
import { LocalGuard } from "./guard/local.guard";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  async signUp(@Body() userInfo: RegisterDto): Promise<User> {
    return await this.authService.register(userInfo);
  }

  @Public()
  @UseGuards(LocalGuard)
  @Post("signin")
  async signIn(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    const user = req.user;
    await this.authService.setCookie(res, user, "access");
    await this.authService.setCookie(res, user, "refresh");
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    // I will not refresh by refresh token itself
    // because I want to make user re-login when refresh token expires
    await this.authService.setCookie(res, user, "access");
  }

  @Get("signout")
  async signOut(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    // Erase saved tokens in frontend and refresh token in database
    await this.authService.removeCookies(res, user);
  }

  @Get("status")
  async status(@CurrentUser() user: User): Promise<UserProfile> {
    return toUserProfile(user);
  }
}
