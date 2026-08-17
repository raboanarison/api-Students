import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers["authorization"];

    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token manquant"
        });
    }

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
};