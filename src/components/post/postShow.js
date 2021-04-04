import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { showErrors } from "../../ducks/message";
import EditPostButton from "./buttons/editPostButton";
import DeletePostButton from "./buttons/deletePostButton";
import { Loader } from "../common/loader/loader";
import styles from "./Post.module.scss";

export default function PostShow() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const postReducer = useSelector((state) => state.postReducer);
  const posts = postReducer.posts;
  const isLoad = postReducer.loading;

  const post = posts.find((post) => post.title === slug);

  if (!post && !isLoad) {
    dispatch(showErrors(`Cant find post ${slug}`));
    history.push("/posts");
    return <></>;
  } else if (isLoad) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className={styles.post}>
        <div className={styles.post__card}>
          <h5 className={"mt-3 ml-3 text-capitalize text-white"}>
            {post.title}
          </h5>
          <div className={"p-3 text-white-100"}>{post.body}</div>

          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            className={styles.post__img}
            src={post.picture.url}
            alt="image"
          />

          <div className={styles.post__btnList}>
            <EditPostButton post={post} />
            <DeletePostButton post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
