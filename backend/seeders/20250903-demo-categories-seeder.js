"use strict";

/** @type {import('sequelize-cli').Seeder} */
export async function up(queryInterface, Sequelize) {
  // Dữ liệu mẫu
  const categories = [
    {
      name: "Programming",
      description: "Sách lập trình",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Web Development",
      description: "Sách phát triển web",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Database",
      description: "Sách về cơ sở dữ liệu",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "AI & ML",
      description: "Sách trí tuệ nhân tạo và Machine Learning",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Design",
      description: "Sách về thiết kế",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await queryInterface.bulkInsert("categories", categories, {});
}

export async function down(queryInterface, Sequelize) {
  // Xóa tất cả dữ liệu trong bảng categories
  await queryInterface.bulkDelete("categories", null, {});
}
