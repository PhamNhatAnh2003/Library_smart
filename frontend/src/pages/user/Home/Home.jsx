import React from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import images from "@/assets/images";

const cx = classNames.bind(styles);

// Data giả
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
  },
  {
    id: 2,
    title: "Laravel Mastery",
    author: "Nguyen Van B",
    description: "Toàn tập Laravel cho backend web",
    avatar: "https://example.com/laravel.png",
    published_year: 2024,
    genre: "Programming",
    price: 300000,
    stock: 5,
  },
];

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      {/* Banner chính */}
      <Banner />
      <div className={cx("main")}>
        {/* Danh mục sách */}
        <section className={cx("categories")}>
          <h2>Danh mục</h2>
          <div className={cx("category-list")}>
            <div className={cx("category-item")}>Lập trình</div>
            <div className={cx("category-item")}>Văn học</div>
            <div className={cx("category-item")}>Kinh tế</div>
            <div className={cx("category-item")}>Thiếu nhi</div>
            <div className={cx("category-item")}>Khoa học</div>
          </div>
        </section>

        {/* Sách nổi bật */}
        <section className={cx("featured")}>
          <h2>📚 Sách nổi bật</h2>
          <div className={cx("book-list")}>
            {books.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Sách mới về */}
        <section className={cx("new-books")}>
          <h2>✨ Sách mới về</h2>
          <div className={cx("book-list")}>
            {books.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Review/Blog */}
        <section className={cx("blog")}>
          <h2>📝 Góc Review</h2>
          <div className={cx("blog-list")}>
            <div className={cx("blog-item")}>
              <img src="https://picsum.photos/200" alt="blog" />
              <p>Top 5 sách lập trình nên đọc năm 2025</p>
            </div>
            <div className={cx("blog-item")}>
              <img src="https://picsum.photos/201" alt="blog" />
              <p>Văn học Việt Nam: Những tác phẩm bất hủ</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={cx("footer")}>
        <p>📖 Thư viện Online © 2025 | Liên hệ: support@library.com</p>
      </footer>
    </div>
  );
};

export default Home;
