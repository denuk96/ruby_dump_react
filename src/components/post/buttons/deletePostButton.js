import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tryDeletePost } from "../../../ducks/post";

function DeletePostButton({ post }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  function deletePost() {
    dispatch(tryDeletePost(post.id));
  }

  if (auth.isSignedIn && auth.user.id === post.user_id) {
    return (
      <div>
        <button onClick={deletePost.bind(null)}>Delete</button>
      </div>
    );
  } else {
    return <></>;
  }
}

DeletePostButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default DeletePostButton;
