import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "./envs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT ?? "5432", 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Credential, Appointment],
  subscribers: [],
  migrations: [],
  // dropSchema: true,
});

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Connection to database successful");
  } catch (error) {
    console.error("Error connecting to database:", error);
    // Re-throw the error to be caught by the caller
    throw error;
  }
}
