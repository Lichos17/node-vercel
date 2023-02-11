import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    "environments",
    `.env.${process.env.NODE_ENV}`
  ),
});

export default {
  jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
  DB: {
    URI: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/prueba",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
    CLUSTER: process.env.MONGODB_CLUSTERNAME || "",
    DATABASE: process.env.MONGODB_DATABASE || "",
  },
};
