import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";

function PostItem({ post, category }) {
  let match = useRouteMatch();

  return (
    <div>
      <b>title: {post.title}</b>
      <p>category_id: {post.category_id}</p>
      <Link to={`${match.url}/${category.name}/${post.title}`}>show</Link>
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

export default PostItem;
