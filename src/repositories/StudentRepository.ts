import type { Student } from "../models/Student.js";
import { pool } from "../configuration/db.js";

export class StudentRepository {

    async findAll(): Promise<Student[]> {
        const result = await pool.query(
            "SELECT * FROM students"
        );

        return result.rows;
    }

    async findById(id: number): Promise<Student | undefined> {
        const result = await pool.query(
            "SELECT * FROM students WHERE id = $1",
            [id]
        );

        return result.rows[0];
    }

    async create(student: Student): Promise<Student> {
        const result = await pool.query(
            "INSERT INTO students(nom, age) VALUES ($1, $2) RETURNING *",
            [student.nom, student.age]
        );

        return result.rows[0];
    }

    async update(id: number, nom: string, age: number): Promise<Student | undefined> {

        const result = await pool.query(
            "UPDATE students SET nom = $1, age = $2 WHERE id = $3 RETURNING *",
            [nom, age, id]
        );

        return result.rows[0];
    }

    async delete(id: number): Promise<boolean> {

        const result = await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );

        return result.rowCount !== 0;
    }
}