import React from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Banner from "@/components/Banner";

const cx = classNames.bind(styles);

const Home = () => {
    return(
        <div className={cx("top")}>
            <Banner />

        </div>
    );
}

export default Home;