"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), "environments", `.env.${process.env.NODE_ENV}`),
});
exports.default = {
    jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/prueba",
        USER: process.env.MONGODB_USER || "",
        PASSWORD: process.env.MONGODB_PASSWORD || "",
        CLUSTER: process.env.MONGODB_CLUSTERNAME || "",
        DATABASE: process.env.MONGODB_DATABASE || "",
    },
};
