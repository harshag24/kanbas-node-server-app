import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import quizRoutes from './Kanbas/Quizzes/routes.js';
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = 'mongodb://localhost:27017/kanbas' || process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
 ));

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: "kanbas-node-server-app-1-p0uc.onrender.com",
  };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
quizRoutes(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000)