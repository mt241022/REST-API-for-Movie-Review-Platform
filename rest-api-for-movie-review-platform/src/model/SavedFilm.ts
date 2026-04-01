import {RowDataPacket} from "mysql2";

export interface ISavedFilm extends RowDataPacket {
    user_id: number;
    film_id: number;
    title: string;
}