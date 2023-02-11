import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

mongoose.set("strictQuery", true);

const url = `mongodb+srv://${config.DB.USER}:${config.DB.PASSWORD}@${config.DB.CLUSTER}.3j5d3.mongodb.net/${config.DB.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(
  process.env.NODE_ENV?.trim() === "dev"
    ? "mongodb://0.0.0.0:27017/prueba"
    : url
);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection stablished");
});

connection.on("error", (err) => {
  console.log(err.message);
  process.exit(0);
});
