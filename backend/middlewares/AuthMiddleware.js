import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import models from "../models/index.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authUserMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Truy cập bị từ chối" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // Kiểm tra User
    const user = await models.User.findByPk(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

export const authAdminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Truy cập bị từ chối" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    const user = await models.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Chỉ admin mới có quyền truy cập",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
