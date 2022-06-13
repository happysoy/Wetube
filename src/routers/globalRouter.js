import express from "express";
import {login, getJoin} from "../controllers/userController";
import {home, search} from "../controllers/videoController";

const globalRouter = express.Router();


globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.get("/watch", login);
globalRouter.get("/search", search);

export default globalRouter;