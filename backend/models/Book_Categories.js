import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Book_Categories extends Model {
  static associate(models) {
    Book_Categories.belongsTo(models.Book, {
      foreignKey: "book_id",
      as: "book",
    });
    Book_Categories.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

Book_Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "books",
        key: "id",
      },
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book_Categories",
    tableName: "book_categories",
    timestamps: false, 
  }
);

export default Book_Categories;
