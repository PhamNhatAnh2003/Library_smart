import User from "./User.js";
import Borrow from "./Borrow.js";
import Book from "./Book.js";
import Category from "./Category.js";
import Book_Categories from "./Book_Categories.js";
import Review from "./Review.js";
import sequelize from "../config/db.js";

const models = {
  User,
  Book_Categories,
  Book,
  Category,
  Borrow,
  Review,
};

// Gọi associate sau khi các model đã có mặt
Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;