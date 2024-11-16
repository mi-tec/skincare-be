import express from "express";
import { createAppointments, getAppointment, getAppointmentSingle } from "../../../services/appointments/index.js"

const router = express.Router();

router.post("/", createAppointments);
router.get("/", getAppointment);
router.get("/single", getAppointmentSingle);

export default router;
