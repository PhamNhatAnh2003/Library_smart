import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const borrowBook = async (confirm = {}) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post(`${API_URL}/borrow/book`, 
      confirm,
    {
        headers: {
          Authorization: `Bearer ${token}`, // gửi kèm token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};