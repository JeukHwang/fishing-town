import { IsIn, IsJSON, IsOptional, IsString } from "class-validator";
import { townType } from "../core/index";

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
