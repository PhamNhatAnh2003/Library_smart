import express from "express";
import multer from "multer";

import {

  createUser,

} from "../controller/userController.js";

const router = express.Router();
const upload = multer();

router.post("/create", createUser);

export default router;