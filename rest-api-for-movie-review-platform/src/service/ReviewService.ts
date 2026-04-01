import {IReview, IReviewData, IUpdateReview} from "../model/Review";
import {DB} from "../db";
import {ResultSetHeader} from "mysql2";

export class ReviewService {

    static async create(review: IReview): Promise<boolean> {
        try {
            const [result] = await DB.execute<ResultSetHeader>(
                "INSERT INTO reviews (film_id, user_id, content) VALUES (?, ?, ?)",
                [review.film_id, review.user_id, review.content]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Fehler beim Erstellen des Reviews:", e);
            return false;
        }
    }

    static async getByFilmId(filmId: number): Promise<IReviewData[]> {
        try {
            const [rows] = await DB.query<IReviewData[]>(
                `SELECT r.*, u.username 
                FROM reviews r
                LEFT JOIN users u ON r.user_id = u.id
                WHERE r.film_id = ?
                ORDER BY r.id DESC`,
                [filmId]
            );
            return rows;
        } catch (e) {
            console.error("Fehler beim Laden der Reviews für Film ", e);
            return [];
        }
    }

    static async update(id: number, userId: number, updateData: IUpdateReview): Promise<boolean> {
        try {
            const [result] = await DB.execute<ResultSetHeader>(
                "UPDATE reviews SET content = ? WHERE id = ? AND user_id = ?",
                [updateData.content, id, userId]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Fehler beim Updaten der Review", e);
            return false;
        }
    }

    static async delete(id: number, userId: number): Promise<boolean> {
        try {
            const [result] = await DB.execute<ResultSetHeader>(
                "DELETE FROM reviews WHERE id = ? AND user_id = ?",
                [id, userId]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Fehler beim Löschen der Review", e);
            return false;
        }
    }
}