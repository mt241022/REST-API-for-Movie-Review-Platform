import {RowDataPacket} from "mysql2";

export interface IFilm {
    title: string;
    description: string;
    genre_id: number;
    user_id: number;
}

export interface IFilmData extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    genre_id: number;
    user_id: number;
}
