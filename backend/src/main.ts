import { Logger, LogLevel, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { corsOptions } from "./util/cors";
import { AllExceptionsFilter } from "./util/exception.filter";
import $V from "./util/variable";

async function bootstrap() {
  const logLevels: LogLevel[] = $V.isProduction
    ? ["error", "warn", "log"]
    : ["error", "warn", "log", "debug", "verbose"];
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.use(cookieParser());
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen($V.PORT);
  if (!$V.isProduction) {
    Logger.debug(`http://localhost:${$V.PORT}`, "BOOTSTRAP");
  }
}
bootstrap();
