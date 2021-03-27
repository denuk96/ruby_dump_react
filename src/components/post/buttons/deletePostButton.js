import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tryDeletePost } from "../../../ducks/post";
import styles from "../Post.module.scss";

function DeletePostButton({ post }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  function deletePost() {
    dispatch(tryDeletePost(post.id));
  }

  if (auth.isSignedIn && auth.user.id === post.user_id) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className={styles.post__newBtn} onClick={deletePost.bind(null)}>
        Delete
      </a>
    );
  } else {
    return <></>;
  }
}

DeletePostButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default DeletePostButton;
