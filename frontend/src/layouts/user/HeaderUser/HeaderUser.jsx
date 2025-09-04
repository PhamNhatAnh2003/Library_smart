import React, {useEffect} from "react";
import styles from "./HeaderUser.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom"; // dùng hook này
const cx = classNames.bind(styles);

const HeaderUser = () => {
  const navigate = useNavigate(); // khởi tạo navigate
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={images.react} alt="" />
        <div className={cx("logo-text")}>library_smart</div>
      </div>
      <div className={cx("action")}>
        <Button
          onClick={() => navigate("/register")}
          className={cx("register-btn")}
        >
          Đăng ký
        </Button>
        <Button onClick={() => navigate("/login")} className={cx("login-btn")}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};
export default HeaderUser;
