import React from "react";
import styles from "./HeaderUser.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images"

const cx = classNames.bind(styles);

const HeaderUser = () => {
    return(
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <img src={images.react} alt="" />
                <div className={cx("logo-text")}>
                    library_smart
                </div>

            </div>
        </div>

    );
}
export default HeaderUser;

