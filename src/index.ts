import express from "express";
import { StudentController } from "./controllers/studentController.js";

const app = express();

app.use(express.json());

const studentController = new StudentController();

app.get("/students", studentController.getAll);
app.get("/students/:id", studentController.getById);
app.post("/students", studentController.create);
app.put("/students/:id", studentController.update);
app.delete("/students/:id", studentController.delete);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});