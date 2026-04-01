import {IUser, IUserData, IUserPassword} from "../model/User";
import {compare, hash} from "bcrypt";
import {DB} from "../db";
import {ResultSetHeader} from "mysql2";

export class UserService {

    static async create(user: IUser): Promise<'conflict' | 'created' | 'error'> {
        const existingUser = await UserService.getByUsername(user.username);

        if (existingUser) return 'conflict';

        user.password = await hash(user.password, 10);

        try{
            const [inserted] = await DB.execute<ResultSetHeader>(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [user.username, user.password]
            );
            if (inserted.affectedRows < 1) return 'error';
            return 'created';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async getByUsername(username: string): Promise<IUserData | undefined> {
        try {
            const [rows] = await DB.query<IUserData[]>(
                "SELECT id, username FROM users WHERE username = ?",
                [username]
            );

            if (!rows || rows.length === 0) {
                return undefined;
            }

            return rows[0];
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    static async validatePassword(data: IUser): Promise<boolean> {
        const [rows] = await DB.query<IUserPassword[]>(
            "SELECT password FROM users WHERE username = ?",
            [data.username]
        );

        if (!rows || rows.length === 0) {
            return false;
        }

        const oldPasswordHash = rows[0].password;
        return await compare(data.password, oldPasswordHash);
    }

    static async getAll(): Promise<IUserData[]> {
        try {
            const [rows] = await DB.query<IUserData[]>("SELECT id, username FROM users");
            return rows;
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}