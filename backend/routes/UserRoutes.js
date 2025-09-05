import express from "express";
import multer from "multer";

import { loginUser, createUser } from "../controller/userController.js";

const router = express.Router();
const upload = multer();

router.post("/create", createUser);
router.post("/login", loginUser);


export default router;