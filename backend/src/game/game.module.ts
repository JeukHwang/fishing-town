import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { GameController } from "./game.controller.js";
import { GameService } from "./game.service.js";

@Module({
  imports: [PrismaModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
