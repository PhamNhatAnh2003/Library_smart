import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Hàm đăng nhập cho User
export const loginUserService = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error("Tài khoản không tồn tại");
  }

  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    throw new Error("Mật khẩu không đúng");
  }

  const payload = {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    avatar: user.avatar,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  return { message: "Đăng nhập thành công", token, user: payload };
};
