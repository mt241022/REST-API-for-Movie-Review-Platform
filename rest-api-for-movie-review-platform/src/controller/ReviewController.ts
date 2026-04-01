import { Express, Request, Response } from "express";
import { IReview } from "../model/Review";
import { ReviewService } from "../service/ReviewService";
import { validateAuth, AuthRequest} from "../auth";

export class ReviewController {

    static init(app: Express) {
        app.get('/reviews/film/:filmId', ReviewController.getByFilm);
        app.post('/reviews', validateAuth, ReviewController.create);
        app.put('/reviews/:id', validateAuth, ReviewController.update);
        app.delete('/reviews/:id', validateAuth, ReviewController.delete);
    }

    static async create(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        const { film_id, content } = req.body;

        if (!film_id || !content) {
            return res.status(400).json({ message: "Film-ID oder Inhalt fehlt" });
        }

        const newReview: IReview = {
            film_id: Number(film_id),
            content: content,
            user_id: authReq.auth.userId
        };

        const success = await ReviewService.create(newReview);

        if (success) {
            res.status(201).json({ message: "Review erstellt" });
        } else {
            res.status(500).json({ message: "Fehler beim Erstellen" });
        }
    }

    static async getByFilm(req: Request, res: Response) {
        const filmId = Number(req.params.filmId);
        const reviews = await ReviewService.getByFilmId(filmId);
        res.status(200).json(reviews);
    }

    static async update(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        const id = Number(req.params.id);
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Inhalt fehlt" });
        }

        const success = await ReviewService.update(id, authReq.auth.userId, { content });

        if (success) {
            res.status(200).json({ message: "Review aktualisiert" });
        } else {
            res.status(403).json({ message: "Nicht erlaubt oder nicht gefunden" });
        }
    }

    static async delete(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        const id = Number(req.params.id);

        const success = await ReviewService.delete(id, authReq.auth.userId);

        if (success) {
            res.status(200).json({ message: "Review gelöscht" });
        } else {
            res.status(403).json({ message: "Nicht erlaubt oder nicht gefunden" });
        }
    }
}