import React from "react";
import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);

const Banner = () =>{
    return (
      <div className={cx("banner")}>
        <div className={cx("main")}>
          <div className={cx("content")}>
            <h1 className={cx("title")}>Khám phá kho sách miễn phí</h1>
            <p className={cx("subtitle")}>
              Hàng ngàn đầu sách cho mọi lứa tuổi. Đăng ký miễn phí – Mượn ngay
              hôm nay!
            </p>
            <button className={cx("cta")}>Mượn sách ngay</button>
          </div>
          <div className={cx("image")}>
            <img src={images.react} alt="Books Illustration" />
          </div>
        </div>
      </div>
    );
}

export default Banner;