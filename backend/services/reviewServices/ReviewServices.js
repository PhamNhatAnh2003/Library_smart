import models from "../../models/index.js";
const { Review, User, Book } = models;

// Thêm review
export const createReview = async ({ user_id, book_id, description }) => {
  try {
    const newReview = await Review.create({
      user_id,
      book_id,
      description,
    });
    return newReview;
  } catch (error) {
    throw new Error("Không thể thêm review: " + error.message);
  }
};

// Lấy review theo job_id
export const getReviewsByBookId = async (Book_id) => {
  try {
    const reviews = await Review.findAll({
      where: { Book_id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"], // chỉ lấy thông tin cần thiết
        },
        {
          model: Book,
          as: "book",
          attributes: ["id", "title"],
        },
      ],
      order: [["createdAt", "DESC"]], // mới nhất lên trước
    });
    return reviews;
  } catch (error) {
    throw new Error("Không thể lấy danh sách review: " + error.message);
  }
};
