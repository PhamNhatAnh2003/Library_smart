import models from "../models/index.js";
import {
  createReview,
  getReviewsByBookId,
} from "../services/reviewServices/ReviewServices.js";

export const addReview = async (req, res) => {
  try {
    const { user_id, book_id, description } = req.body;
    if (!user_id || !book_id || !description) {
      return res.status(400).json({ message: "Thiếu thông tin review" });
    }

    const review = await createReview({ user_id, book_id, description });
    res.status(201).json({ message: "Thêm review thành công", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { book_id } = req.params;
    const reviews = await getReviewsByBookId(book_id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
