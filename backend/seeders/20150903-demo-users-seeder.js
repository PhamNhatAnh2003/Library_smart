"use strict";

/** @type {import('sequelize-cli').Seeder} */
export async function up(queryInterface, Sequelize) {
  // Dữ liệu mẫu
  const users = [
    {
      username: "user2",
      password: 12345,
      full_name: "Kanashi",
      avatar: null,
      phone: "0987454321",
      role: "admin",
      email: "kuwado@gmail.com",
    },
  ];

  await queryInterface.bulkInsert("users", users, {});
}

export async function down(queryInterface, Sequelize) {
  // Xóa tất cả dữ liệu trong bảng categories
  await queryInterface.bulkDelete("users", null, {});
}
