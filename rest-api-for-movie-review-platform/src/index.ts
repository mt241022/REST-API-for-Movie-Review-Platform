import {loadEnvFile} from "node:process";

loadEnvFile();

import express from "express";
import cors from "cors";
import {UserController} from "./controller/UserController";
import {AuthController} from "./controller/AuthController";
import {FilmController} from "./controller/FilmController";
import {GenreController} from "./controller/GenreController";
import {ReviewController} from "./controller/ReviewController";
import {SavedFilmController} from "./controller/SavedFilmController";

const app = express();

app.use(express.json());
app.use(cors());

AuthController.init(app);
UserController.init(app);
FilmController.init(app);
GenreController.init(app);
ReviewController.init(app);
SavedFilmController.init(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
