import { Credential } from "../entities/Credential";
import { CredentialRepository } from "../repositories/CredentialRepository";

export const createCredentialService = async (
  username: string,
  password: string
): Promise<Credential> => {
  const newCredential = CredentialRepository.create({ username, password });
  const savedNewCredential: Credential = await CredentialRepository.save(
    newCredential
  );
  return savedNewCredential;
};

export const validateCredentialService = async (
  username: string,
  password: string
) => {
  // check if username passed as argument in this function exists in Credentials repository
  const validatedCredential = await CredentialRepository.findOne({
    where: { username },
  });
  // if username exists check if its password is the same as the password passed as argument in this function
  // if both of this conditions are ok then return the corresponding id
  if (validatedCredential && validatedCredential.password === password) {
    return validatedCredential.id;
  }
  // If username or password is incorrect, throw an error indicating invalid credentials
  throw new Error("Invalid username or password");
};
