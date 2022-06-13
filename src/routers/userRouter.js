import express from "express";
import {login, logout, see, edit, remove} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/:id", see);

export default userRouter;