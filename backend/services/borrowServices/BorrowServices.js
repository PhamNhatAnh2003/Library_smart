import models from "../../models/index.js";
import dayjs from "dayjs";
const { Borrow, User, Book } = models;

export const borrowBook = async (user_id, book_id, due_date, return_date) => {
  try {
    const newBorrow = await Borrow.create({
      book_id,
      user_id,
      due_date,
      return_date,
    });

   const borrowWithDetail = await Borrow.findByPk(newBorrow.id, {
     include: [
       { model: User, as: "user", attributes: ["id", "full_name", "email"] },
       { model: Book, as: "book", attributes: ["id", "title", "author"] },
     ],
   });

   return borrowWithDetail;
  } catch (err) {
    console.error("Error borrowBook:", err);
    throw err.response?.data || "Lỗi khi mượn sách";
  }
};

export const updateStatus = async (user_id, book_id, status) => {
  try {
    // tìm bản ghi borrow hiện tại
    const borrow = await Borrow.findOne({
      where: { user_id, book_id },
    });

    if (!borrow) {
      throw new Error("Không tìm thấy bản ghi mượn sách để cập nhật");
    }

    borrow.status = status;
    if (status === "returned") {
      borrow.return_date = new Date(); 
    }
    await borrow.save();

    const borrowWithDetail = await Borrow.findByPk(borrow.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "full_name", "email"] },
        { model: Book, as: "book", attributes: ["id", "title", "author"] },
      ],
    });

    return borrowWithDetail;
  } catch (err) {
    console.error("Error updateStatus:", err);
    throw new Error("Lỗi khi cập nhật trạng thái mượn sách");
  }
};
