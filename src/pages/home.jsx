import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import styles from "./home.module.css";

import { Button } from "../components/button";

export function HomePage() {
  const history = useHistory();
  const list = useCallback(() => {
    history.replace({ pathname: "/list" });
  }, [history]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.heading}>Nobel Prize Library</h1>
          <Button onClick={list} primary={true}>
            View catalog
          </Button>
        </form>
        <p>1901-2020</p>
      </div>
    </div>
  );
}
