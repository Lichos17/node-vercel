import { Router } from "express";

import { signIn, signUp, userInfo } from "../controllers/user.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", protectRoute, userInfo);

export default router;
