"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
mongoose_1.default.set("strictQuery", true);
const url = `mongodb+srv://${config_1.default.DB.USER}:${config_1.default.DB.PASSWORD}@${config_1.default.DB.CLUSTER}.3j5d3.mongodb.net/${config_1.default.DB.DATABASE}?retryWrites=true&w=majority`;
mongoose_1.default.connect(((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === "dev"
    ? "mongodb://0.0.0.0:27017/prueba"
    : url);
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("Mongodb connection stablished");
});
connection.on("error", (err) => {
    console.log(err.message);
    process.exit(0);
});
