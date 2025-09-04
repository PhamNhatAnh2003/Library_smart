// services/bookService.js
import models from "../../models/index.js";

const { Book, Category } = models;

/**
 * Thêm sách mới
 * @param {Object} data - Thông tin sách
 * @param {string} data.title
 * @param {string} data.author
 * @param {string} data.description
 * @param {string} data.avatar
 * @param {number} data.published_year
 * @param {string} data.genre
 * @param {number} data.price
 * @param {number} data.stock
 * @param {Array<number>} data.categoryIds - Danh sách category_id liên kết
 * @returns {Promise<Object>} Thông tin sách vừa tạo kèm category
 */
export const addBookService = async (data) => {
  const {
    title,
    author,
    description,
    avatar,
    published_year,
    genre,
    price,
    stock,
    categoryIds = [],
  } = data;

  // Kiểm tra dữ liệu cơ bản
  if (!title || !price || stock == null) {
    throw new Error("Thiếu thông tin bắt buộc: title, price hoặc stock");
  }

  try {
    // Tạo sách mới
    const book = await Book.create({
      title,
      author,
      description,
      avatar,
      published_year,
      genre,
      price,
      stock,
    });

    // Thêm các category liên quan nếu có
    if (categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: { id: categoryIds },
      });
      if (categories.length > 0) {
        await book.addCategories(categories);
      }
    }

    // Lấy lại sách kèm category
    const createdBook = await Book.findByPk(book.id, {
      include: [{ model: Category, as: "categories" }],
    });

    return { message: "Thêm sách thành công", book: createdBook };
  } catch (error) {
    console.error("Error addBookService:", error);
    throw new Error("Thêm sách thất bại");
  }
};
