const express = require("express");
const app = express();

app.use(express.json());

let etudiants = [
    { id: 1, nom: "Michaia", age: 20 },
    { id: 2, nom: "Fenohasina", age: 21 }
];

app.get("/students", (req, res) => {
    res.status(200).json(etudiants);
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = etudiants.find(e => e.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

app.post("/students", (req, res) => {
    const newStudent = {
        id: etudiants.length + 1,
        nom: req.body.nom,
        age: req.body.age
    };

    etudiants.push(newStudent);

    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = etudiants.find(e => e.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.nom = req.body.nom;
    student.age = req.body.age;

    res.status(200).json(student);
});

app.patch("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = etudiants.find(e => e.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (req.body.nom) {
        student.nom = req.body.nom;
    }

    if (req.body.age) {
        student.age = req.body.age;
    }

    res.status(200).json(student);
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = etudiants.find(e => e.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    etudiants = etudiants.filter(e => e.id !== id);

    res.status(200).json({
        message: "Student deleted"
    });
});

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});