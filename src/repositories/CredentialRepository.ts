import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

export const CredentialRepository = AppDataSource.getRepository(Credential);
