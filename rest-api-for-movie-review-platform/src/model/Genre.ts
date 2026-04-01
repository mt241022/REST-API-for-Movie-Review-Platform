import {RowDataPacket} from "mysql2";

export interface IGenre {
    name: string;
}

export interface IGenreData extends RowDataPacket {
    name: string;
    id: number;
}