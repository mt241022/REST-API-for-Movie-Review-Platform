import {ISavedFilm} from "../model/SavedFilm";
import {DB} from "../db";
import {ResultSetHeader} from "mysql2";

export class SavedFilmService {

    static async getByUser(userId: number): Promise<ISavedFilm[]> {
        try {
            const [rows] = await DB.query<ISavedFilm[]>(
                `SELECT sf.user_id, sf.film_id, f.title
                 FROM saved_films sf
                 JOIN films f ON sf.film_id = f.id
                 WHERE sf.user_id = ?`,
                [userId]
            );
            return rows;
        } catch (e) {
            console.error("Fehler beim Abrufen der gespeicherten Filme", e);
            return [];
        }
    }

    static async save(userId: number, filmId: number): Promise<boolean> {
        try{
            const [result] = await DB.execute<ResultSetHeader>(
                "INSERT INTO saved_films (user_id, film_id) VALUES (?, ?)",
                [userId, filmId]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Fehler beim Speichern zu Favoriten", e);
            return false;
        }
    }

    static async remove(userId: number, filmId: number): Promise<boolean> {
        try{
            const [result] = await DB.execute<ResultSetHeader>(
                "DELETE FROM saved_films WHERE user_id = ? AND film_id = ?",
                [userId, filmId]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Fehler beim Entfernen des gespeicherten Films", e);
            return false;
        }
    }
}