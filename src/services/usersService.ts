import {
  createCredentialService,
  validateCredentialService,
} from "./credentialsService";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import CreateUserDto from "../dto/CreateUserDto";

export const createUserService = async (user: CreateUserDto): Promise<User> => {
  const { name, email, birthdate, nDni, username, password } = user;

  // Create the user entity
  const newUser: User = UserRepository.create({ name, email, birthdate, nDni });

  // Create the credential
  const newCredential: Credential = await createCredentialService(
    username,
    password
  );

  // Set the credential for the new user
  newUser.credentials = newCredential;

  // Save the new user
  await UserRepository.save(newUser);

  // Return the newly created user
  return newUser;
};

// Get all users
export const getUsersService = async (): Promise<User[]> => {
  const allUsers = await UserRepository.find({
    relations: { credentials: true },
  });
  return allUsers;
};

// Get User By Id
export const getUserByIdService = async (id: number): Promise<User | null> => {
  const userById = await UserRepository.findOne({
    where: { id },
    relations: ["appointments"],
  });
  if (!userById) throw Error("User not found for the provided user ID");
  return userById;
};

export const findUserByCredentialsIdService = async (credentialsId: number) => {
  const foundUser = await UserRepository.findOneBy({
    credentials: { id: credentialsId },
  });
  return foundUser;
};

export const userLoginService = async (username: string, password: string) => {
  // check if username passed as argument exists in credentials and password corresponds
  // to the password passed as argument
  const credentialId = await validateCredentialService(username, password);
  const userCredentials = await findUserByCredentialsIdService(credentialId);
  return userCredentials;
};

// Delete User and credentials

// export const deleteUserService = async (id: number): Promise<void> => {
//   dummyUsers = dummyUsers.filter((dummyUser) => {
//     return id !== dummyUser.id;
//   });
// };
