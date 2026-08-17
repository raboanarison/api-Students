import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { StudentController } from "./controllers/studentController.js";
import { AuthController } from "./controllers/AuthController.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const studentController = new StudentController();
const authController = new AuthController();

app.post("/register", authController.register);
app.post("/login", authController.login);

app.get(
    "/students",
    authenticateToken,
    studentController.getAll
);
app.get("/students/:id", studentController.getById);
app.post("/students", studentController.create);
app.put("/students/:id", studentController.update);
app.delete("/students/:id", studentController.delete);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});