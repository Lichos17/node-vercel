import express from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes";
import boughtsRoutes from "./routes/boughts.routes";
import { protectRoute } from "./middleware/protectRoute";

//initializations
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//settings
app.set("port", process.env.PORT || 5000);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(limiter);

//routes
app.get("/", protectRoute, (req, res) => {
  res.send(`The API is at http://localhost: ${app.get("port")}`);
});

app.use("/auth", authRoutes);
app.use("/bought", boughtsRoutes);

export default app;
