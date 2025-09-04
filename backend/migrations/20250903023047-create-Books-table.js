"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("books", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    author: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    avatar: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    published_year: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    genre: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("books");
}
