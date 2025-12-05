import express from "express";
import "dotenv/config";
import { expressjwt } from "express-jwt";
// Routes
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/tasks.route.js";
import cors from "cors";
import { allowedOrigins } from "./config/cors.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth",
  }).unless({
    path: [
      { url: "/api/login", methods: ["POST"] },
      { url: "/api/signup", methods: ["POST"] },
    ],
  })
);

// Auth routes
app.use("/api", authRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

export default app;
