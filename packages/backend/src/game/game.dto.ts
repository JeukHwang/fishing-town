import { townType } from "@fishing-town/shared";
import { IsIn, IsJSON, IsOptional, IsString } from "class-validator";

export class UpdateSettingDto {
  @IsJSON()
  rule!: JSON;
}

export class JoinGameDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsIn(townType)
  town!: string;
}

export class LeaveDto {
  @IsString()
  id!: string;
}
