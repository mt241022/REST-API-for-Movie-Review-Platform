import {RowDataPacket} from "mysql2";

export interface IReview {
    film_id: number;
    user_id: number;
    content: string;
}

export interface IReviewData extends RowDataPacket {
    id: number;
    film_id: number;
    user_id: number;
    content: string;
    username?: string;
}

export interface IUpdateReview {
    content: string;
}