import { Router } from "express";
import {
  getAppointments,
  getAppointmentById,
  scheduleAppointment,
  cancelAppointment,
} from "../controllers/appointmentsControllers";

const appointmentsRouter: Router = Router();

// Get all appointments
appointmentsRouter.get("/", getAppointments);

// Get single appointment
appointmentsRouter.get("/:id", getAppointmentById);

// Schdule appointmet
appointmentsRouter.post("/schedule", scheduleAppointment);

// Cancel appointment
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
