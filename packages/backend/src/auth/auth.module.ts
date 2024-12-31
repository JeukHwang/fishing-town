import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { JwtAccessStrategy } from "./strategy/jwt-access.strategy.js";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy.js";
import { LocalStrategy } from "./strategy/local.strategy.js";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
