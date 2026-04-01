import {IFilm, IFilmData} from "../model/Film";
import {DB} from "../db";
import {ResultSetHeader} from "mysql2";

export class FilmService {

    static async create(film: IFilm): Promise<boolean> {
        try{
            const [result] = await DB.execute<ResultSetHeader>(
                "INSERT INTO films (title, description, genre_id, user_id) VALUES (?, ?, ?, ?)",
                [film.title, film.description, film.genre_id, film.user_id]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Fehler beim Anlegen des Films", e);
            return false;
        }
    }

    static async getAll(): Promise<IFilmData[]> {
        try {
            const [rows] = await DB.query<IFilmData[]>(
                "SELECT * FROM films"
            );
            return rows;
        } catch (e) {
            console.error("Fehler beim Abrufen aller Filme:", e);
            return [];
        }
    }

    static async getById(id: number): Promise<IFilmData | undefined> {
        try {
            const [rows] = await DB.query<IFilmData[]>(
                "SELECT * FROM films WHERE id = ?", [id]
            );
            return rows[0] || undefined;
        } catch (e) {
            console.error("Fehler beim Abrufen des Films:", e);
            return undefined;
        }
    }
}