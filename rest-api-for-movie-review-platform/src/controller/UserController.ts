import { Express, Request, Response } from "express";
import { IUser } from "../model/User";
import { UserService } from "../service/UserService";

export class UserController {

    static init(app: Express) {
        app.post('/users', UserController.createUser);
        app.get('/users', UserController.getAllUsers);
        app.get('/users/:username', UserController.getByUsername);
    }

    static async createUser(req: Request, res: Response) {
        const data = req.body as IUser;

        if (!data || !data.username || !data.password) {
            res.status(400).json({ message: 'Missing fields' });
            return;
        }

        const result = await UserService.create(data);

        if (result === 'conflict') {
            res.status(409).json({ message: 'Username already exists' });
            return;
        } else if (result === 'error') {
            res.status(500).json({ message: 'Database error' });
            return;
        }

        res.status(201).json({ message: 'User created successfully' });
    }

    static async getByUsername(req: Request, res: Response) {
        const user = await UserService.getByUsername(req.params.username as string);

        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).json(user);
    }

    static async getAllUsers(req: Request, res: Response) {
        const users = await UserService.getAll();
        res.status(200).json(users);
    }
}