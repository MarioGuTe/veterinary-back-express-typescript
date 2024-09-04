import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { initializeDatabase } from "./config/data-source";

async function startServer() {
  try {
    await initializeDatabase();
    server.listen(PORT, () => {
      console.log(`Server listening on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
