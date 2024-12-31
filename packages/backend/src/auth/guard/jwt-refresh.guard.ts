import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Actually AuthGuard(['jwt-refresh']) is enough since nestjs/passport automatically make guard from strategy,
// but I want to make GoogleGuard object to use easier and exactly without misspelling
@Injectable()
export class JwtRefreshGuard extends AuthGuard("jwt-refresh") {}
