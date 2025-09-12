import models from "../../models/index.js";

const { Book, Category } = models;
import { Op } from "sequelize";

// Lấy sách theo name
export const getBooksService = async ({
  name,
  category,
  author,
  year,
  minPrice,
  maxPrice,
}) => {
  try {
    const whereClause = {};

    // tìm theo tên (title)
    if (name) {
      whereClause.title = { [Op.like]: `%${name}%` };
    }

    // lọc theo category (genre)
    if (category) {
      whereClause.genre = category;
    }

    // lọc theo author
    if (author) {
      whereClause.author = { [Op.like]: `%${author}%` };
    }

    // lọc theo năm xuất bản
    if (year) {
      whereClause.published_year = year;
    }

    if (minPrice && maxPrice) {
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      whereClause.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      whereClause.price = { [Op.lte]: maxPrice };
    }

    const books = await Book.findAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name"],
          ...(category && { where: { name: category } }), // lọc theo tên category
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return books;
  } catch (error) {
    throw new Error("Lỗi khi lấy sách: " + error.message);
  }
};

export const getBooksByCategoryService = async (categoryName) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Category,
          as: "categories", 
          attributes: ["id", "name"],
          where: { name: categoryName }, 
          through: { attributes: [] }, 
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return books;
  } catch (error) {
    throw new Error("Lỗi khi lấy sách theo category: " + error.message);
  }
};

export const getBookByIdService = async (id) => {
  try {
    const book = await Book.findByPk(id, {
      include: [
        { model: Category, as: "categories", attributes: ["id", "name"] },
      ],
      order: [["created_at", "DESC"]],
    });
    if (!book) {
      throw new Error("Không tìm thấy sách với ID: " + id);
    }
    return book;
  } catch (error) {
    throw new Error("Lỗi khi lấy sách theo ID: " + error.message);
  }
};
