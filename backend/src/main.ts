import { Logger, LogLevel, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module.js";
import { AllExceptionsFilter } from "./util/exception.filter.js";
import $V from "./util/variable.js";

async function bootstrap() {
  const logLevels: LogLevel[] = $V.isProduction
    ? ["error", "warn", "log"]
    : ["error", "warn", "log", "debug", "verbose"];
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.use(cookieParser());
  app.enableCors({
    // Never use trailing slashes in the origin URL to prevent CORS issues
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173", // Frontend development server
        "https://fishing-town.jeuk.io", // Frontend production server
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen($V.PORT);
  if (!$V.isProduction) {
    Logger.debug(`http://localhost:${$V.PORT}`, "BOOTSTRAP");
  }
}
bootstrap();
