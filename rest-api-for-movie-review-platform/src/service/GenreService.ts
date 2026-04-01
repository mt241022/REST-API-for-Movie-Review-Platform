import {IGenreData} from '../model/Genre';
import {DB} from "../db";

export class GenreService {

    static async getAll(): Promise<IGenreData[]> {
        try{
            const [rows] = await DB.query<IGenreData[]>(
                "SELECT * FROM genres ORDER BY name ASC"
            );
            return rows;
        } catch (e) {
            console.error("Fehler beim Abrufen der Genres:", e);
            return [];
        }
    }

    static async getById(id: number): Promise<IGenreData | undefined> {
        try{
            const [rows] = await DB.query<IGenreData[]>(
                "SELECT * FROM genres WHERE id = ?", [id]
            );
            return rows[0] || undefined;
        } catch (e) {
            console.error("Fehler beim Abrufen der Genres:", e);
            return undefined;
        }
    }
}