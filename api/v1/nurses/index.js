import express from "express";
import { createNurse, getNurse } from "../../../services/nurses/index.js";

const router = express.Router();

router.get("/", getNurse);
router.post("/create", createNurse);

export default router;
