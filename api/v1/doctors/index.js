import express from "express";
import { createDoctor, getDoctors } from "../../../services/doctors/index.js";

const router = express.Router();

router.get("/", getDoctors);
router.post("/create", createDoctor);

export default router;
