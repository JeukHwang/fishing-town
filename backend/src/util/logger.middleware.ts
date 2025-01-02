/** @see https://docs.nestjs.com/middleware */
/** @see https://wanago.io/2021/10/04/api-nestjs-logging-typeorm/ */

import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

type RequestWithProps = Request & { startTime: number };

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(request: RequestWithProps, response: Response, next: () => void): void {
    request.startTime = Date.now();
    response.on("finish", () => {
      const { method, originalUrl, startTime } = request;
      const { statusCode, statusMessage } = response;

      const dt = `${Date.now() - startTime}ms`.padStart(6, " ");
      const resMsg = `${statusCode} ${statusMessage.padEnd(30, " ")}`;
      const reqMsg = `${method.padEnd(7, " ")} ${originalUrl}`;
      const message = `${resMsg} | ${dt} | ${reqMsg}`;

      if (statusCode >= 500) {
        const user = `${request.ip} | ${request.get("user-agent") || "-"}`;
        this.logger.error(message.concat("\n", user));
      } else if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });
    next();
  }
}
