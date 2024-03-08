import express from "express";
import { login, register, onBoarding } from "../../../../services/auth/admin/index.js"

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/onboarding", onBoarding);

export default router;
