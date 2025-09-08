import express from "express";
import multer from "multer";

import {
  createBook,
  getBookByName,
  getBooksByCategoryController,
} from "../controller/bookController.js";

import {
  authUserMiddleware,
  authAdminMiddleware,
} from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer();

router.post("/create",authAdminMiddleware, createBook);
router.get("/books", getBookByName);
router.get("/books/category/:category", getBooksByCategoryController);


export default router;