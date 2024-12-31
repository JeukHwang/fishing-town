import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module.js";
import { JwtAccessGuard } from "./auth/guard/jwt-access.guard.js";
import { PlayerModule } from "./player/player.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { TownModule } from "./town/town.module.js";
import { UserModule } from "./user/user.module.js";
import { LoggerMiddleware } from "./util/logger.middleware.js";
import { GameModule } from './game/game.module.js';

@Module({
  imports: [PrismaModule, TownModule, PlayerModule, AuthModule, UserModule, GameModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAccessGuard }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // Apply for all routes
  }
}
