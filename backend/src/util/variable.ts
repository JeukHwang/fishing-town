import { randomBytes } from "crypto";
import "dotenv/config";
import { env } from "process";

/** @description Get env variable */
function e<T extends string = string>(key: string, defaultValue?: T): T {
  const value: T = (env[key] as T) ?? defaultValue;
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}

/** @description Get env variable as number */
function e2n(key: string, defaultValue?: number): number {
  return parseInt(e(key, defaultValue?.toString()), 10);
}

const NODE_ENV = e<"production" | "development">("NODE_ENV", "production");

/** @description Get env variable or generate random string for development */
function eOrR(key: string, length: number): string {
  const defaultValue = randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
  console.log(`Generated random string for ${key}: ${defaultValue}`);
  return e(key, defaultValue);
}

const environmentVariable = {
  NODE_ENV,
  PORT: e2n("PORT", 3000),
  ADMIN_SECRET: eOrR("ADMIN_SECRET", 50),
  API_ADMIN_SECRET: e("API_ADMIN_SECRET") as string,
  PRISMA: {
    // https://railway.app/dashboard
    DB_URL: e("PRISMA_DB_URL") as string,
  },
  JWT: {
    SECRET: eOrR("JWT_SECRET", 50),
    ACCESS_TOKEN_SECRET: eOrR("JWT_ACCESS_TOKEN_SECRET", 50),
    ACCESS_TOKEN_EXPIRATION_TIME: e2n(
      "JWT_ACCESS_TOKEN_EXPIRATION_TIME",
      60 * 60 // 1 hour in seconds
    ),
    REFRESH_TOKEN_SECRET: eOrR("JWT_REFRESH_TOKEN_SECRET", 50),
    REFRESH_TOKEN_EXPIRATION_TIME: e2n(
      "JWT_REFRESH_TOKEN_EXPIRATION_TIME",
      60 * 60 * 24 * 30 // 30 days in seconds
    ),
  },
};

/** @description Environment variable and little utility functions */
const isProduction = environmentVariable.NODE_ENV === "production";
const $V = {
  ...environmentVariable,
  isProduction,
  domain: isProduction ? "jeuk.io" : "localhost",
  isAdmin: (secret: string): boolean =>
    secret === environmentVariable.ADMIN_SECRET,
};
export default $V;
