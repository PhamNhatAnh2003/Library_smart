import express from "express";
import multer from "multer";

import { createBook } from "../controller/bookController.js";

const router = express.Router();
const upload = multer();

router.post("/create", createBook);

export default router;