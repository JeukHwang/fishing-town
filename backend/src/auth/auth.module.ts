import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAccessStrategy } from "./strategy/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
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
