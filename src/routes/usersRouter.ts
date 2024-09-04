import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  userLogin,
  // deleteUser,
} from "../controllers/usersControllers";
// import auth from "../middlewares/auth";

const usersRouter: Router = Router();

// Get all users
usersRouter.get("/", getUsers);
// Get user by id
usersRouter.get("/:id", getUserById);
// Register User
usersRouter.post("/register", createUser);
// User Login
usersRouter.post("/login", userLogin);

// usersRouter.delete("/", deleteUser);

export default usersRouter;
