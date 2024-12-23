import { IsEmail, IsString } from "class-validator";

export class CreateDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}
