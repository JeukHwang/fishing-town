import { Module } from "@nestjs/common";
import { TownController } from './town.controller.js';

@Module({
  controllers: [TownController],
})
export class TownModule {}
