import express from "express";
import multer from "multer";
import {
  authUserMiddleware,
  authAdminMiddleware,
} from "../middlewares/AuthMiddleware.js";

import {
  borrowBooks,
  updateBorrowStatus,
} from "../controller/borrowController.js";

const router = express.Router();
const upload = multer();

router.post("/book", authUserMiddleware, borrowBooks);
router.post("/update",authAdminMiddleware, updateBorrowStatus);


export default router;