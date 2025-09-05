import React, { useState, useEffect, useRef } from "react";
import styles from "./HeaderUser.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/Redux/features/authSlice";
import config from "@/config";


const cx = classNames.bind(styles);

const HeaderUser = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log("User in HeaderUser:", user);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={images.react} alt="" />
        <div className={cx("logo-text")}>Library_smart</div>
      </div>
      <div className={cx("actions")}>
        {!user && (
          <>
            <Button
              onClick={() => navigate("/register")}
              className={cx("register-btn")}
            >
              Đăng ký
            </Button>
            <Button
            secondary
              onClick={() => navigate("/login")}
              className={cx("login-btn")}
            >
              Đăng nhập
            </Button>
          </>
        )}

        {user && (
          <div className={cx("user-menu")}>
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt="avatar"
              className={cx("avatar")}
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className={cx("dropdown")}>
                <Button
                  secondary
                  className={cx("dropdown-btn")}
                  onClick={() => navigate(config.routes.user.userProfile)}
                >
                  Profile
                </Button>
                <Button
                  secondary
                  className={cx("dropdown-btn")}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default HeaderUser;
