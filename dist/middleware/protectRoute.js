"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const util_1 = require("util");
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).send({
            status: "error",
            msg: "No tienes permitido ingresar a esta ruta",
        });
    }
    try {
        const signToken = (0, util_1.promisify)(jsonwebtoken_1.default.verify);
        const decoded = yield signToken(token, config_1.default.jwtSecret);
        const user = yield user_1.default.findOne({
            email: decoded.email,
        });
        if (!user) {
            res.statusCode = 404;
            return res.json({
                status: "error",
                msg: "No se encontro al usuario con el email dado.",
            });
        }
        req.user = user.toObject();
        next();
    }
    catch (err) {
        console.log(err.message);
        res.statusCode = 402;
        return res.json({
            status: "error",
            msg: "Something went wrong.",
        });
    }
});
exports.protectRoute = protectRoute;
