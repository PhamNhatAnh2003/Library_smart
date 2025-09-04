import express from "express";
import multer from "multer";

import { addReview, getReviews } from "../controller/reviewController.js";

const router = express.Router();
const upload = multer();

router.post("/add", addReview);
router.post("/get", getReviews);

export default router;