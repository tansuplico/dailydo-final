import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import notesListRouter from "./routes/notesListRoutes.js";
import taskListRouter from "./routes/taskListRoutes.js";
import trashListRouter from "./routes/trashListRoutes.js";
import workspaceRouter from "./routes/workspaceRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://dailydo-0bc4.onrender.com",
    credentials: true,
  })
);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Routers
app.use("/api/user", userRouter);
app.use("/api/workspace", workspaceRouter);
app.use("/api/notes", notesListRouter);
app.use("/api/trash-list", trashListRouter);
app.use("/api/tasks-list", taskListRouter);

// Use the client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// Render client
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to the database");

    app.listen(3000, () => {
      console.log("Server is listening to port 3000");
    });
  })
  .catch((error) => {
    console.log(`An error has occured: ${error}`);
  });
