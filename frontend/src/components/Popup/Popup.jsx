import React, { useState } from "react";
import { Modal, Button, DatePicker, Form, Input } from "antd";
import styles from "./Popup.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { borrowBook } from "../../services/borrowBookServices/borrowBookServices.js";

const cx = classNames.bind(styles);

const Popup = ({ visible, onClose, book, onConfirm }) => {
  const [returnDate, setReturnDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const user = useSelector((state) => state.auth.user);


const handleConfirm = async () => {
  if (!user) return; // nếu chưa login thì không cho mượn

  try {
    setLoading(true);

    const confirm = {
      book_id: book.id,
      user_id: user.id,
      // borrowDate: new Date(),
    };

    const data = await borrowBook(confirm); 
    console.log("API response:", data);

    console.log("Mượn sách:", book.id, "Người mượn:", user.id);
    onClose();
  } catch (err) {
    console.error("Lỗi khi mượn sách:", err);
  } finally {
    setLoading(false);
  }
};



  return (
    <Modal title="Mượn sách" open={visible} onCancel={onClose} footer={null}>
      <div className={cx("bookInfo")}>
        <img
          src={book?.image || ""}
          alt={book?.title || ""}
          className={cx("bookImage")}
        />
        <div className={cx("bookDetails")}>
          <p className={cx("bookTitle")}>
            <b>{book?.title}</b>
          </p>
          <p>Tác giả: {book?.author}</p>
          <p>Mã sách: {book?.code}</p>
        </div>
      </div>

      <Form layout="vertical" className={cx("form")}>
        <Form.Item label="Người mượn">
          <Input
            value={user.full_name}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập tên sách..."
          />
        </Form.Item>
        <Form.Item label="Ghi chú">
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nhập ghi chú"
          />
        </Form.Item>
        <Form.Item label="Ngày trả dự kiến">
          <DatePicker
            className={cx("datePicker")}
            onChange={(date) => setReturnDate(date)}
          />
        </Form.Item>
      </Form>

      <div className={cx("actions")}>
        <Button onClick={onClose}>Hủy</Button>
        <Button type="primary" onClick={handleConfirm} disabled={!user}>
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};

export default Popup;
