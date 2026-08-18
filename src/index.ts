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

app.get(
    "/students/:id",
    authenticateToken,
    studentController.getById
);

app.post(
    "/students",
    authenticateToken,
    studentController.create
);

app.put(
    "/students/:id",
    authenticateToken,
    studentController.update
);

app.delete(
    "/students/:id",
    authenticateToken,
    studentController.delete
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});