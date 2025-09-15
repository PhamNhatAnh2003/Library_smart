import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../../utils/stringUtil";
import images from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./BookDetail.module.scss";
import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import { getBookById } from "@/services/bookServices/bookService";
import { Modal } from "antd"; 
import Popup from "@/components/Popup/Popup";

const cx = classNames.bind(styles);

const BookDetail = ({ onBorrow }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleApply = () => {
    if (!user) {
      alert("Chưa đăng nhập → điều hướng sang login");
      navigate("/login");
    } else {
      setOpen(true); 
    }
  };


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-content")}>
        <div className={cx("job-container")}>
          <div className={cx("newdiv")}>
            <h1 onClick={() => navigate(-1)} className={cx("job-title")}>
              <FontAwesomeIcon icon={faChevronLeft} />
              <span className={cx("job-title-text")}>{book.title}</span>
            </h1>
            <div className={cx("badges")}>
              <span className={cx("badge", "type-v")}>{book.genre}</span>
              <span className={cx("badge", "category-v")}>
                {book.published_year}
              </span>
            </div>
          </div>

          <h2 className={cx("section-title")}>Thông tin cơ bản</h2>
          <div className={cx("basic-info")}>
            <div className={cx("left-column")}>
              <ul>
                <li>{formatPrice(book.price)}</li>
                <li>{book.stock} cuốn</li>
              </ul>
            </div>
            <div className={cx("right-column")}>
              <div className={cx("icon-pushpin")}>
                <img src={images.pushpin} alt="pushpin" />
              </div>
              <div className={cx("company-v")}>
                <div className={cx("avatar")}>
                  <img src={images.react ?? images.avatar} alt="company-logo" />
                </div>
                <div className={cx("company-info")}>
                  <div className={cx("company-name")}>{book.author}</div>
                </div>
              </div>
              <div className={cx("apply")}>
                <Button onClick={handleApply} className={cx("btn")}>
                  Mượn sách
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        visible={open}
        onClose={() => setOpen(false)}
        book={book}
        onConfirm={(data) => {
          console.log("Borrow request:", data);
        }}
      />
    </div>
  );
};

export default BookDetail;
