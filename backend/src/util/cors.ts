import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
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
  /** @see https://github.com/expressjs/cors?tab=readme-ov-file#configuration-options */
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Allow default methods + OPTIONS for preflight
  credentials: true,
};
