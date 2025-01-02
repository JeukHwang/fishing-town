import { Module } from '@nestjs/common';
import { GameService } from './game.service.js';
import { GameController } from './game.controller.js';

@Module({
  providers: [GameService],
  controllers: [GameController]
})
export class GameModule {}
