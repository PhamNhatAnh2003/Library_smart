import React from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import images from "@/assets/images"
const cx = classNames.bind(styles);

const books = [
  {
    id: 1,
    title: "Lập trình Node.js",
    author: "Nguyen Van A",
    description: "Sách hướng dẫn Node.js cơ bản đến nâng cao",
    avatar: images.react,
    published_year: 2025,
    genre: "Programming",
    price: 250000,
    stock: 10,
    createdAt: "2025-09-04T01:28:22.000Z",
    updatedAt: "2025-09-04T01:28:22.000Z",
    categories: [],
  },
  {
    id: 2,
    title: "Lập trình Node.js",
    author: "Nguyen Van A",
    description: "Sách hướng dẫn Node.js cơ bản đến nâng cao",
    avatar: "https://example.com/nodejs.png",
    published_year: 2025,
    genre: "Programming",
    price: 250000,
    stock: 10,
    createdAt: "2025-09-04T01:28:22.000Z",
    updatedAt: "2025-09-04T01:28:22.000Z",
    categories: [],
  },
];

const Home = () => {
    return(
        <div className={cx("wrapper")}>
            <Banner />
            <div className={cx("title")}>
              <span>Danh Sách Nổi Bật </span>
            </div>
            <div className={cx("book-list")}>
                {books.map((book) => (
            <Card key={book.id} book={book} />
          ))}
        </div>
        </div>
    );
}

export default Home;