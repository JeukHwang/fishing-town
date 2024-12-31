import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import $V from "../util/variable.js";

const options: Prisma.PrismaClientOptions = {
  datasourceUrl: $V.PRISMA.DB_URL,
  errorFormat: "pretty",
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
} as const;

@Injectable()
export class PrismaService
  extends PrismaClient<typeof options, "query" | "info" | "warn" | "error">
  implements OnModuleInit
{
  constructor() {
    super(options);

    this.$on("query", function queryEventLogger(event) {
      console.log("Query: " + event.query);
      console.log("Params: " + event.params);
      console.log("Duration: " + event.duration + "ms");
      console.log("Timestamp: " + event.timestamp + "ms");
    });
    this.$use(async function queryResultLogger(
      params: Prisma.MiddlewareParams,
      next
    ) {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`
      );
      //   console.log(`Result ${JSON.stringify(result)}`);
      return result;
    });
    this.$use(async function softDeleteMiddleware(params, next) {
      switch (params.action) {
        case "delete":
          params.action = "update";
          params.args["data"] = { deletedAt: new Date() };
          break;
        case "deleteMany":
          params.action = "updateMany";
          params.args["data"] = { deletedAt: new Date() };
          break;
      }
      return next(params);
    });
    // this.$use(async function softDeleteMiddleware(params, next) {
    //   switch (params.action) {
    //     case "findUnique":
    //     case "findUniqueOrThrow":
    //     case "findMany":
    //     case "findFirst":
    //     case "findFirstOrThrow":
    //       params.args["where"] = {
    //         ...params.args["where"],
    //         deletedAt: null,
    //       };
    //       break;
    //     case "create":
    //     case "createMany":
    //     case "createManyAndReturn":
    //       break;
    //     case "update":
    //     case "updateMany":
    //     case "upsert":
    //       params.args["where"] = {
    //         ...params.args["where"],
    //         deletedAt: null,
    //       };
    //       params.args["data"] = {
    //         ...params.args["data"],
    //         updatedAt: new Date(),
    //       };
    //       break;
    //     case "delete":
    //       params.action = "update";
    //       params.args["data"] = { deletedAt: new Date() };
    //       break;
    //     case "deleteMany":
    //       params.action = "updateMany";
    //       params.args["data"] = { deletedAt: new Date() };
    //       break;
    //     //   | 'executeRaw'
    //     //   | 'queryRaw'
    //     //   | 'aggregate'
    //     //   | 'count'
    //     //   | 'runCommandRaw'
    //     //   | 'findRaw'
    //     //   | 'groupBy'
    //     default:
    //       console.error(`Unknown action: ${params.action}`);
    //   }
    //   return next(params);
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(_app: INestApplication) {
    // this.$on("beforeExit", async () => {
    //   await app.close();
    // });
  }
}
