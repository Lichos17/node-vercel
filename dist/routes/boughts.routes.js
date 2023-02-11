"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bought_controller_1 = require("../controllers/bought.controller");
const protectRoute_1 = require("../middleware/protectRoute");
const router = (0, express_1.Router)();
router.get("/", protectRoute_1.protectRoute, bought_controller_1.getBoughts);
router.post("/", protectRoute_1.protectRoute, bought_controller_1.createBought);
exports.default = router;
