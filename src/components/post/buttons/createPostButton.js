import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../Post.module.scss";

export default function CreatePostButton() {
  const isSignedIn = useSelector((state) => state.authReducer.isSignedIn);

  return <div className={["text-right", styles.post].join(' ')}>{isSignedIn && <Link to="/posts/new" className={styles.post__newBtn}>Create new POST </Link>}</div>;
}
