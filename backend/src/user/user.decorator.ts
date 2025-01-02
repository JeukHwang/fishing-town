import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import { User } from "@prisma/client";
import type { Request } from "express";

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: Request & { user: User } = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
