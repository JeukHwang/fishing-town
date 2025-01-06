import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { LobbyController } from "./lobby.controller";
import { LobbyService } from "./lobby.service";

@Module({
  imports: [PrismaModule],
  controllers: [LobbyController],
  providers: [LobbyService],
})
export class LobbyModule {}
