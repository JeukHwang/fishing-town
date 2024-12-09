import { Module } from "@nestjs/common";
import { TownController } from './town.controller';

@Module({
  controllers: [TownController],
})
export class TownModule {}
