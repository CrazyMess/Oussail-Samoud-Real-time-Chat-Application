import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import friendRoutes from "./routes/friend.route.js";

import { connectDB } from "./lib/dbConnect.js";
import { app, server } from "./lib/socket.js";

// Middlewares
app.use(bodyParser.json({ limit: "2mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

dotenv.config();

const PORT = process.env.PORT;

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendRoutes);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
