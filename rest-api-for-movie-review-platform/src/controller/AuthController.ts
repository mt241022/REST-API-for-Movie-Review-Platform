import { Express, Request, Response } from "express";
import { IUser } from "../model/User";
import { UserService } from "../service/UserService";
import { generateToken, ITokenPayload } from "../auth";

export class AuthController {

    static init(app: Express) {
        app.post('/login', AuthController.login);
    }

    static async login(req: Request, res: Response) {
        const data = req.body as IUser;

        if (!data || !data.username || !data.password) {
            res.status(400).json({ message: 'Missing fields' });
            return;
        }

        const isValid = await UserService.validatePassword(data);

        if (!isValid) {
            res.status(401).send();
            return;
        }

        // User aus DB laden, um auch die ID zu erhalten
        const userFromDb = await UserService.getByUsername(data.username);

        if (!userFromDb) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const payload: ITokenPayload = {
            userId: userFromDb.id,
            username: userFromDb.username
        };

        res.json({
            token: generateToken(payload)
        });
    }
}