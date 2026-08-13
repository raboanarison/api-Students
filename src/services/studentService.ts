import { StudentRepository } from "../repositories/StudentRepository.js";
import type { Student } from "../models/Student.js";

export class StudentService {

    private repository = new StudentRepository();

    async getAll(): Promise<Student[]> {
        return await this.repository.findAll();
    }

    async getById(id: number): Promise<Student | undefined> {
        return await this.repository.findById(id);
    }

    async create(nom: string, age: number): Promise<Student> {

        const student: Student = {
            id: 0,
            nom,
            age
        };

        return await this.repository.create(student);
    }

    async update(id: number, nom: string, age: number): Promise<Student | undefined> {
        return await this.repository.update(id, nom, age);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }
}