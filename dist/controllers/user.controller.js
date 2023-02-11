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
exports.userInfo = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: "1h",
    });
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, passwordConfirm } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            status: "error",
            msg: "Please, provide your email, password and name",
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (user)
        return res
            .status(400)
            .json({ status: "error", msg: "El usuario ya existe." });
    const newUser = new user_1.default({ email, password, name, passwordConfirm });
    yield newUser.save();
    const token = createToken(newUser);
    return res.status(200).json({
        status: "success",
        token,
        data: { user: Object.assign(Object.assign({}, newUser.toObject()), { password: undefined }) },
    });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            msg: "Please, provide your email, password and name",
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (!user)
        return res
            .status(400)
            .json({ status: "error", msg: "The user does not exist" });
    const hasMatch = yield user.comparePasswords(password);
    if (!hasMatch)
        return res
            .status(400)
            .json({ status: "error", msg: "Revisa tus credenciales." });
    const token = createToken(user);
    return res.status(200).json({
        status: "success",
        token,
        data: { user: Object.assign(Object.assign({}, user.toObject()), { password: undefined }) },
    });
});
exports.signIn = signIn;
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.statusCode = 200;
    return res.json({
        status: "success",
        data: { user: Object.assign(Object.assign({}, user), { password: undefined }) },
    });
});
exports.userInfo = userInfo;
