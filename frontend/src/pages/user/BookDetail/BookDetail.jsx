import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice, formatDateTime } from "../../../utils/stringUtil";
import images from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./BookDetail.module.scss";
import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import {getBookById} from "@/services/bookServices/bookService";

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

const BookDetail = ({ book = Book }) => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await getBookById(id); 
      setBook(res.data);
      console.log(res);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  };
  fetchBook();
}, [id]);

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
                <li>{formatPrice(book.price)}/</li>
                <li>
                  {/* <WorkIcon className={cx("icon-inline")} /> */}
                  {book.stock}
                </li>
                <li>{"Không yêu cầu kinh nghiệm"}</li>
                <li>{"2 người"}</li>


              </ul>
            </div>
            <div className={cx("right-column")}>
              <div className={cx("icon-pushpin")}>
                <img src={""} alt="pushpin" />
              </div>
              <div className={cx("company-v")}>
                <div className={cx("avatar")}>
                  <img
                    src={images.avatar ?? images.avatar}
                    alt="company-logo"
                  />
                </div>
                <div className={cx("company-info")}>
                  <div className={cx("company-name")}>{"images.avatar"}</div>
                  <div className={cx("company-location")}>{book.author}</div>
                </div>
              </div>
              <div className={cx("info")}>
                <li>
                  {""}
                </li>
                <li>
                  {"job.company.industry"}
                </li>
                <li>
                  {"job.company.location"}
                </li>
              </div>
              <div className={cx("apply")}>
                <Button  className={cx("btn")}>
                  Mượn sách
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
