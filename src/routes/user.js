import express from "express";
import { me } from "../controllers/user.js";
import { authorize } from "../middleware/authorization.js";

const userRouter = express.Router();

userRouter.get("/me", authorize, me);

export default userRouter;
