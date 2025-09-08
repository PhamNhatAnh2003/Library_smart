import models from "../models/index.js";
import {
  borrowBook,
  updateStatus,
} from "../services/borrowServices/BorrowServices.js";


export const borrowBooks = async (req, res) => {
  try {
    const { user_id, book_id} = req.body;
    if (!user_id || !book_id) {
      return res.status(400).json({ message: "Thiếu thông tin để mượn" });
    }

    const borrow = await borrowBook(user_id, book_id);
    res.status(201).json({ message: "Mượn sách thành công", borrow });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBorrowStatus = async (req, res) => {
  try {
    const { user_id, book_id, status } = req.body;
    if (!user_id || !book_id || !status) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    const update = await updateStatus(user_id, book_id, status);
    res.status(201).json({ message: "Thay đổi trạng thái thành công", update });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};