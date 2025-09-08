import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Book extends Model {
    static associate(models) {
   Book.belongsToMany(models.Category, {
     through: models.Book_Categories,
     foreignKey: "book_id",
     otherKey: "category_id",
     as: "categories",
   });
  }}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255), 
      unique: false,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255), 
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    published_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "books",
    modelName: "Book",
    timestamps: true, 
    underscored: true, 
  }
);

export default Book;
