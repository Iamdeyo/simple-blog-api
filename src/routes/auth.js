import express from "express";
import { login, register } from "../controllers/auth.js";
import { upload } from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register", upload.single("image"), register);
authRouter.post("/login", login);

export default authRouter;
