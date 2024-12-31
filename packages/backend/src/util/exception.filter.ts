/** @see https://docs.nestjs.com/exception-filters#catch-everything */
/** @see https://stackoverflow.com/questions/72207189/nestjs-exception-filter-messes-up-error-array-if-it-comes-from-validationpipe */

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

interface ExceptionReponse {
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: Date;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger("ExceptionFilter");
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    // Avoid security issues by preventing the client from knowing the cause of the error
    const responseBody: ExceptionReponse = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        exception instanceof HttpException
          ? exception instanceof BadRequestException // Exception from ValidationPipe
            ? exception["response"]["message"]
            : exception.message
          : "Internal Server Error",
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date(),
    };
    if (!(exception instanceof HttpException)) {
      this.logger.error(exception, exception.stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
