import models from "../models/index.js";
import { addBookService } from "../services/bookServices/addBookServices.js";
import { getBooksService } from "../services/bookServices/getBookServices.js";

export const createBook = async (req, res) => {
  try {
    const book = await addBookService(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookByName = async (req, res) => {
  try {
   const { name, category, author, year, minPrice, maxPrice } = req.query;

   const books = await getBooksService({
     name,
     category,
     author,
     year,
     minPrice,
     maxPrice,
   });


    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBooksByCategoryController = async (req, res) => {
  try {
    const { category } = req.params; // /books/category/:category

    const books = await getBooksByCategoryService(category);

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
