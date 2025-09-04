"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    full_name: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    avatar: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: true,
      unique: true,
    },
    role: {
      type: Sequelize.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: true,
      unique: true,
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
  await queryInterface.dropTable("users");
}
