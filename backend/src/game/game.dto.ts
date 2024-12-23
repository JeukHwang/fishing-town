import { towntype } from "@core/region";
import { IsIn, IsJSON, IsOptional, IsString } from "class-validator";

export class UpdateSettingDto {
  id: string;

  @IsJSON()
  rule: JSON;
}

export class JoinGameDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsIn(towntype)
  town: string;
}

export class LeaveDto {
  @IsString()
  id: string;
}
