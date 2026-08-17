import { pool } from "../configuration/db.js";
import { User } from "../models/user.js";

export class UserRepository {

    async create(user: User) {

        const result = await pool.query(
            "INSERT INTO users(username,password) VALUES($1,$2) RETURNING *",
            [user.username, user.password]
        );

        return result.rows[0];
    }

    async findByUsername(username: string) {

        const result = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        return result.rows[0];
    }
}