import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Category extends Model {
  static associate(models) {
    Category.belongsToMany(models.Book, {
      through: models.Book_Categories,
      foreignKey: "category_id",
      otherKey: "book_id",
      as: "books",
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "categories", 
    modelName: "Category",
    timestamps: true,
    underscored: true,
  }
);

export default Category;
