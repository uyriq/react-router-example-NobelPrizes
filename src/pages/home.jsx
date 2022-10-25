import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.heading}>Nobel Prize Library</h1>
        </form>

        <p>1901-2020</p>
        <Link className={styles.link} to="/list">
          View catalog
        </Link>
      </div>
    </div>
  );
}
