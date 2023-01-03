"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productCategories = ["refrescos", "galletas"];
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: productCategories,
    },
    price: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
