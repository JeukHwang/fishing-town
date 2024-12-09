import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { JwtAccessGuard } from "./auth/guard/jwt-access.guard";
import { PlayerModule } from "./player/player.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TownModule } from "./town/town.module";
import { UserModule } from "./user/user.module";
import { LoggerMiddleware } from "./util/logger.middleware";

@Module({
  imports: [PrismaModule, TownModule, PlayerModule, AuthModule, UserModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAccessGuard }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // Apply for all routes
  }
}
