import express from "express";
import { createAppointments, getAppointment } from "../../../services/appointments/index.js"

const router = express.Router();

router.post("/", createAppointments);
router.get("/", getAppointment);

export default router;
