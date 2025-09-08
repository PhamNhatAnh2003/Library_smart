"use strict";
import bcrypt from "bcryptjs";

/** @type {import('sequelize-cli').Seeder} */
export async function up(queryInterface, Sequelize) {
  const passwordHash = await bcrypt.hash("123456", 10); // mật khẩu mặc định
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
    {
      username: "admin",
      password: passwordHash,
      email: "admin@example.com",
      full_name: "Administrator",
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await queryInterface.bulkInsert("users", users, {});
}

export async function down(queryInterface, Sequelize) {
  // Xóa tất cả dữ liệu trong bảng categories
  await queryInterface.bulkDelete("users", null, {});
}
