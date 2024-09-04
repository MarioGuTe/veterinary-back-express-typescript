import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";

const server = express();

// Middlewares
server.use(morgan("dev"));
server.use(cors());

// turn data into js object
server.use(express.json());
// Router
server.use(router);

export default server;
