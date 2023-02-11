"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const boughts_routes_1 = __importDefault(require("./routes/boughts.routes"));
const protectRoute_1 = require("./middleware/protectRoute");
//initializations
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//settings
app.set("port", process.env.PORT || 5000);
//middlewares
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(limiter);
//routes
app.get("/", protectRoute_1.protectRoute, (req, res) => {
    res.send(`The API is at http://localhost: ${app.get("port")}`);
});
app.use("/auth", auth_routes_1.default);
app.use("/bought", boughts_routes_1.default);
exports.default = app;
