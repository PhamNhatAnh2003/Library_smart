import models from "../../models/index.js";

export const createUserService = async (data) => {
  const checkUserName = await models.User.findOne({
    where: { username: data.username },
  });

  if (checkUserName) {
    throw new Error(`Tên đăng nhập ${data.username} đã tồn tại`);
  }

  try {
    const user = await models.User.create(data);
    return user;
  } catch (err) {
    console.error("Lỗi khi tạo user trong service:", err);
    throw err;
  }

  return user;
};
