import express from "express";
import {
    trending, watch,getEdit, postEdit, deleteVideo,
    getUpload, postUpload
} from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
// id 정규표현식
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;