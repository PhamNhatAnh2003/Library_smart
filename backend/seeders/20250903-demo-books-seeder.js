"use strict";

/** @type {import('sequelize-cli').Seeder} */
export async function up(queryInterface, Sequelize) {
  const books = [
    {
      title: "Lập trình Node.js",
      author: "Nguyen Van A",
      description: "Sách hướng dẫn Node.js cơ bản đến nâng cao",
      avatar: "https://example.com/nodejs.png",
      published_year: 2025,
      genre: "Programming",
      price: 250000,
      stock: 10,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Học ReactJS từ cơ bản đến nâng cao",
      author: "Tran Thi B",
      description:
        "Hướng dẫn chi tiết xây dựng ứng dụng web với ReactJS, hooks và Redux.",
      avatar: "https://example.com/reactjs.png",
      published_year: 2024,
      genre: "Web Development",
      price: 300000,
      stock: 15,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Cơ sở dữ liệu MySQL cho người mới",
      author: "Le Van C",
      description:
        "Hướng dẫn quản trị và lập trình cơ sở dữ liệu MySQL từ cơ bản đến nâng cao",
      avatar: "https://example.com/mysql.png",
      published_year: 2023,
      genre: "Database",
      price: 200000,
      stock: 20,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await queryInterface.bulkInsert("books", books, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("books", null, {});
}
