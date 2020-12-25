import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function EditPostButton({ post }) {
  const auth = useSelector((state) => state.authReducer);
  if (auth.isSignedIn && auth.user.id === post.user_id) {
    return (
      <Link
        to={{
          pathname: "/posts/edit",
          state: { post },
        }}
      >
        EDIT!
      </Link>
    );
  } else {
    return <></>;
  }
}

EditPostButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default EditPostButton;
