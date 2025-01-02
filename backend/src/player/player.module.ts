import { Module } from '@nestjs/common';
import { PlayerService } from './player.service.js';

@Module({
  providers: [PlayerService]
})
export class PlayerModule {}
