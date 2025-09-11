import React, { useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, register } from "@/redux/features/authSlice";
import styles from "./Login.module.scss";
import images from "@/assets/images";


export default function AuthForm() {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [firstname, setFirstname] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then((res) => {
        console.log("Login thành công:", res);
        navigate("/"); // hoặc config.routes.user.home
      })
      .catch((err) => {
        console.error("Login thất bại:", err);
      });
  };

  const handleSignUp = () => {
    dispatch(register({ username, password }))
      .unwrap()
      .then((res) => {
        console.log("Đăng ký thành công:", res);
        // Có thể tự động đăng nhập hoặc chuyển hướng đến trang đăng nhập
        navigate("/");
      })
      .catch((err) => {
        console.error("Đăng ký thất bại:", err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.container, { [styles.active]: isActive })}
      >
        {/* Sign Up */}
        <div className={classNames(styles.formContainer, styles.signUp)}>
          <form>
            <h1>SIGN UP</h1>
            <div className={styles.anhmo}>
              <img src={images.react} alt="login-poster" />
            </div>
            <span>Or use your email for registration</span>
            <input
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <input
              type="lastname"
              placeholder="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="firstname"
              placeholder="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            /> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleSignUp} disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>

        {/* Sign In */}
        <div className={classNames(styles.formContainer, styles.signIn)}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>SIGN IN</h1>
            <div className={styles.anhmo}>
              <img src={images.react} alt="login-poster" />
            </div>
            <span>Or use your email for login</span>
            <input
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forget Your password</a>
            <button type="submit" onClick={handleLogin} disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>

        {/* Toggle */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={classNames(styles.togglePanel, styles.toggleLeft)}>
              <h1>Welcome</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>
            <div className={classNames(styles.togglePanel, styles.toggleRight)}>
              <h1>Hello Friend</h1>
              <p>Register your personal details to use all of site features</p>
              <button className="hidden" onClick={() => setIsActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
