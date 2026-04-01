import { Express, Request, Response } from "express";
import { GenreService } from "../service/GenreService";

export class GenreController {

    static init(app: Express) {
        app.get('/genres', GenreController.getAll)
        app.get('/genres/:id', GenreController.getById);
    }

    static async getAll(req: Request, res: Response) {
        const genres = await GenreService.getAll();
        res.status(200).json(genres);
    }

    static async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id as string);
        const genre = await GenreService.getById(id);

        if (genre){
            res.status(200).json(genre);
        } else {
            res.status(404).json({message: "Genre nicht gefunden"});
        }
    }
}