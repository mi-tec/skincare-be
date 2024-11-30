import express from "express";
import { login, register } from "../../../../services/auth/admin/index.js";

const router = express.Router();

router.post("/login", login);

export default router;
