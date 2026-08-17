import express from "express";
import dotenv from "dotenv";

import { AuthController } from "./controllers/AuthController.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());

const authController = new AuthController();

app.post("/register", authController.register);

app.post("/login", authController.login);

app.get(
    "/students",
    authenticateToken,
    (req, res) => {

        res.json({
            message: "Route protégée"
        });
    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});