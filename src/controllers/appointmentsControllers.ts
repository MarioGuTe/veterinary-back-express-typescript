import { Request, Response } from "express";
import {
  cancelAppointmentService,
  getAppointmentByIdService,
  getAppointmentsService,
  scheduleAppointmentService,
} from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";

// Get all appointments
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const allAppointments = await getAppointmentsService();
    res.status(200).json(allAppointments);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// Get an appointment by id
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Appointment ID is required" });
    }

    const appointmentId: number = parseInt(id, 10);
    if (isNaN(appointmentId)) {
      return res.status(400).json({ error: "Appointment ID must be a number" });
    }

    const appointmentById: Appointment | null = await getAppointmentByIdService(
      appointmentId
    );

    if (!appointmentById) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    return res.status(200).json(appointmentById);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  const { date, time, userId } = req.body;
  try {
    await scheduleAppointmentService({
      date,
      time,
      userId,
      status: "active",
    });

    res
      .status(201)
      .json({ message: "Your Appointment has been successfully scheduled" });
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(400).json({ message: "Failed to schedule appointment" });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await cancelAppointmentService(Number(id));
    res.status(200).json({ message: "Your appointment has been cancelled" });
  } catch (error) {
    res.status(404).json({ error: "Appointment not found" });
  }
};
