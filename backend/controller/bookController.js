import models from "../models/index.js";
import { addBookService } from "../services/bookServices/addBookServices.js";

export const createBook = async (req, res) => {
  try {
    const book = await addBookService(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
