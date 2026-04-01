import { Express, Request, Response } from "express";
import { IFilm } from "../model/Film";
import { FilmService } from "../service/FilmService";
import { validateAuth, AuthRequest } from "../auth";

export class FilmController {

    static init(app: Express) {
        app.post('/films', validateAuth, FilmController.createFilm);
        app.get('/films', FilmController.getAllFilms);
        app.get ('/films/:id', FilmController.getById);
    }

    static async createFilm(req: Request, res: Response) {
        const authReq = req as AuthRequest;

        const filmData: IFilm = {
            title: req.body.title,
            description: req.body.description,
            genre_id: req.body.genre_id,
            user_id: authReq.auth.userId
        };

        if (!filmData.title || !filmData.description) {
            res.status(400).json({ message: "Titel und/oder Beschreibung fehlen" });
            return;
        }

        const success = await FilmService.create(filmData);
        if (success) {
            res.status(201).json({ message: "Film erfolgreich angelegt" });
        } else {
            res.status(500).json({ message: "Fehler beim Speichern" });
        }
    }

    static async getAllFilms(req: Request, res: Response) {
        const films = await FilmService.getAll();
        res.status(200).json(films);
    }

    static async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id as string);
        const film = await FilmService.getById(id);

        if (film) {
            res.status(200).json(film);
        } else {
            res.status(404).json({ message: "Film nicht gefunden" });
        }
    }
}