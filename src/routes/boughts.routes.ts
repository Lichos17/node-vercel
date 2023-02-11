import { Router } from "express";

import { getBoughts, createBought } from "../controllers/bought.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = Router();

router.get("/", protectRoute, getBoughts);
router.post("/", protectRoute, createBought);

export default router;
