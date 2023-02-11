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
exports.getBoughts = exports.createBought = void 0;
const bought_1 = __importDefault(require("../models/bought"));
const createBought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { property } = req.body;
    if (!property) {
        res.statusCode = 400;
        return res.json({
            status: "error",
            msg: "Debes proveer una propiedad.",
        });
    }
    try {
        const bought = yield bought_1.default.create({ user: user._id, property: property });
        res.statusCode = 200;
        return res.json({
            status: "success",
            data: { bought },
        });
    }
    catch (err) {
        res.statusCode = 500;
        return res.json({
            status: "error",
            msg: "Algo ha salido mal.",
        });
    }
});
exports.createBought = createBought;
const getBoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const boughts = yield bought_1.default.find({ user: user._id });
        res.statusCode = 200;
        return res.json({
            status: "success",
            data: { boughts },
        });
    }
    catch (err) {
        res.statusCode = 500;
        return res.json({
            status: "error",
            msg: "Algo ha salido mal.",
        });
    }
});
exports.getBoughts = getBoughts;
