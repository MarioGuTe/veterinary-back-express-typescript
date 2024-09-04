import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";
import { getUserByIdService } from "./usersService";
import { AppointmentRepository } from "../repositories/AppointmentRepository";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  const allAppointments = await AppointmentRepository.find();
  return allAppointments;
};

export const getAppointmentByIdService = async (appointmentId: number) => {
  const appointmentById = await AppointmentRepository.findOne({
    where: { id: appointmentId },
  });
  return appointmentById;
};

export const scheduleAppointmentService = async (
  appointment: AppointmentDto
): Promise<void> => {
  const { userId } = appointment;
  // // Validate user ID
  const userById = await getUserByIdService(userId);
  if (!userById) {
    throw new Error("User not found for the provided user ID");
  }

  const newAppointment = AppointmentRepository.create(appointment);
  await AppointmentRepository.save(newAppointment);
};

export const cancelAppointmentService = async (
  appointmentId: number
): Promise<void> => {
  const appointmentById = await AppointmentRepository.findOne({
    where: { id: appointmentId },
  });
  if (!appointmentById) {
    throw new Error("Appointment not found");
  }
  appointmentById.status = "cancelled";
  await AppointmentRepository.save(appointmentById);
};
