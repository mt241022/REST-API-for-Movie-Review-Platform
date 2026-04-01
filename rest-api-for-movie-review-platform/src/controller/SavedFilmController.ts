import { Express, Request, Response } from "express";
import {SavedFilmService} from "../service/SavedFilmService";
import { validateAuth, AuthRequest} from "../auth";

export class SavedFilmController {

    static init(app: Express) {
        app.get('/saved-films', validateAuth, SavedFilmController.getAll);
        app.post('/saved-films/:filmId', validateAuth, SavedFilmController.add);
        app.delete('/saved-films/:filmId', validateAuth, SavedFilmController.remove);
    }

    static async getAll(req: Request, res: Response) {
        const authReq = req as AuthRequest;

        const films = await SavedFilmService.getByUser(authReq.auth.userId);
        res.status(200).json(films);
    }

    static async add(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        const filmId = Number(req.params.filmId);

        const success = await SavedFilmService.save(authReq.auth.userId, filmId);

        if (success) {
            res.status(201).json({ message: "Film zu Favoriten hinzugefügt" });
        } else {
            res.status(500).json({ message: "Fehler beim Speichern" });
        }
    }

    static async remove(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        const filmId = Number(req.params.filmId);

        const success = await SavedFilmService.remove(authReq.auth.userId, filmId);

        if (success) {
            res.status(200).json({ message: "Film aus Favoriten entfernt" });
        } else {
            res.status(404).json({ message: "Film war nicht in deinen Favoriten" });
        }
    }
}