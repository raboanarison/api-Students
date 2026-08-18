import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token manquant"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        next();

    } catch {
        return res.status(403).json({
            message: "Token invalide"
        });
    }
}