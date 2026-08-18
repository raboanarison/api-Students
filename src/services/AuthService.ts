import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository.js";

export class AuthService {

    private repo = new UserRepository();

    async register(
        username: string,
        password: string
    ) {
        const hashedPassword =
            await bcrypt.hash(password, 10);

        return this.repo.create({
            username,
            password: hashedPassword
        });
    }

    async login(
        username: string,
        password: string
    ) {
        const user =
            await this.repo.findByUsername(username);

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        const valid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!valid) {
            throw new Error("Mot de passe incorrect");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h"
            }
        );

        return token;
    }
}