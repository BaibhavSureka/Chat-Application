import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const PORT = process.env.PORT || 5005;
const URI = process.env.mongoDB_URI;

try {
  mongoose.connect(URI);
  console.log("now you are connect with URI");
} catch (error) {
  console.log("error");
}

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`server app listening on port ${PORT}`);
});
