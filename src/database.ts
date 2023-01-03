import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

mongoose.set("strictQuery", true);

mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection stablished");
});

connection.on("error", (err) => {
  console.log(err.message);
  process.exit(0);
});
