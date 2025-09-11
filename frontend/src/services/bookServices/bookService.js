import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getBookByName = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_URL}/books/books`, {
      params: filters, 
    });
    return res.data; 
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};