import { Request, Response } from "express";
import {
  createUserService,
  getUsersService,
  getUserByIdService,
  // deleteUserService,
  userLoginService,
} from "../services/usersService";
import { User } from "../entities/User";

// Create/Register User an the related credentials
export const createUser = async (req: Request, res: Response) => {
  const { name, email, birthdate, nDni, username, password } = req.body;

  try {
    const newUser = await createUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers: User[] = await getUsersService();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// Get User By id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId: number = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userById: User | null = await getUserByIdService(userId);

    if (!userById) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userById);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userLoginService(username, password);
    res.status(200).json({ login: true, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete User
// export const deleteUser = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   await deleteUserService(id);
//   res.status(201).json({ message: "user deleted" });
// };
