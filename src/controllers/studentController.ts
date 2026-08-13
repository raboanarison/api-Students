import type { Request, Response } from "express";
import { StudentService } from "../services/studentService.js";

export class StudentController {

    private service = new StudentService();

    getAll = async (req: Request, res: Response) => {
        const students = await this.service.getAll();
        res.json(students);
    };

    getById = async (req: Request, res: Response) => {

        const student = await this.service.getById(
            Number(req.params.id)
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    };

    create = async (req: Request, res: Response) => {

        const student = await this.service.create(
            req.body.nom,
            req.body.age
        );

        res.status(201).json(student);
    };

    update = async (req: Request, res: Response) => {

        const student = await this.service.update(
            Number(req.params.id),
            req.body.nom,
            req.body.age
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    };

    delete = async (req: Request, res: Response) => {

        const deleted = await this.service.delete(
            Number(req.params.id)
        );

        if (!deleted) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted"
        });
    };
}