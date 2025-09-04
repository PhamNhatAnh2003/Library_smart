import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // instance sequelize đã khởi tạo sẵn

class Review extends Model {
  static associate(models) {
    Review.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Review.belongsTo(models.Book, {
      foreignKey: "book_id",
      as: "book",
    });
}
}
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "books",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      description: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review", // Tên model
      tableName: "reviews", // Tên bảng trong DB
      timestamps: true, // Tự tạo createdAt, updatedAt
      underscored: true,
    }
  );


export default Review;