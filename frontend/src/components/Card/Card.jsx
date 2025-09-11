import React from "react";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {formatPrice} from "@/utils/stringUtil.js"

const cx = classNames.bind(styles);

const Book = {
  id: 1,
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
};

const Card = ({ book = Book, onBorrow }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Lấy user từ Redux

  const handleApply = () => {
    if (!user) {
      alert("Chưa đăng nhập → điều hướng sang login");
      navigate("/login"); // dùng react-router-dom
    } else {
      console.log("Mượn sách:", book.id);
      if (onBorrow) onBorrow(book.id); // gọi callback nếu có
    }
  };

  return (
    <div className={cx("card")}>
      <img onClick={() => navigate(`/bookDetail/${book.id}`)} src={book.avatar} alt={book.title} className={cx("cover")} />
      <div
        onClick={() => navigate(`/bookDetail/${book.id}`)}
        className={cx("info")}
      >
        <h3 className={cx("title")}>{book.title}</h3>
        <p className={cx("author")}>Tác giả: {book.author}</p>
        <p className={cx("category")}>
          Thể loại: {book.categories?.map((c) => c.name).join(", ")}
        </p>
        <p className={cx("year")}>Năm XB: {book.published_year}</p>
        <p className={cx("price")}>Giá bán TT: {formatPrice(book.price)}</p>
      </div>
      <div className={cx("btn")}>
        <button
          className={cx("borrow-btn")}
          onClick={handleApply}
          disabled={book.stock <= 0}
        >
          {book.stock > 0 ? "Mượn sách" : "Hết sách"}
        </button>
      </div>
    </div>
  );
};

export default Card;
