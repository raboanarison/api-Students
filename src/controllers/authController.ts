import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

export class AuthController {

    private service = new AuthService();

    register = async (req: Request, res: Response) => {

        try {

            const user = await this.service.register(
                req.body.username,
                req.body.password
            );

            res.status(201).json(user);

        } catch (error) {

            res.status(500).json(error);
        }
    };

    login = async (req: Request, res: Response) => {

        try {

            const token = await this.service.login(
                req.body.username,
                req.body.password
            );

            res.json({ token });

        } catch (error) {

            res.status(401).json(error);
        }
    };
}