import {RowDataPacket} from "mysql2";

export interface IUser {
    username: string;
    password: string;
}

export interface IUserData extends RowDataPacket {
    id: number;
    username: string;
}

export interface IUserPassword extends RowDataPacket {
    password: string;
}
