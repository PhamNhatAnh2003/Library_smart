import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Borrow extends Model {
  static associate(models) {
    Borrow.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Borrow.belongsTo(models.Book, {
      foreignKey: "book_id",
      as: "book",
    });
  }
}

Borrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("borrowed", "returned", "late"),
      allowNull: false,
      defaultValue: "borrowed",
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: "borrows",
    modelName: "Borrow",
    timestamps: true, 
    underscored: true, 
  }
);

export default Borrow;
