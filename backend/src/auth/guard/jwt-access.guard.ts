import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import type { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../auth.decorator";
@Injectable()
export class JwtAccessGuard
  extends AuthGuard("jwt-access")
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  override canActivate(
    context: ExecutionContext
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic ? true : super.canActivate(context);
  }
}
