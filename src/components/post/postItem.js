import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import styles from "./Post.module.scss";

function PostItem({ post, category }) {
  let match = useRouteMatch();

  return (
    <div className={styles.post}>
        <div className={styles.post__card}>
            <h5 className={"mt-2 text-center text-white"}>{post.title}</h5>
            <p className={"p-3 text-white-100"}>{post.body}</p>
            {category ? (
                <Link to={`${match.url}/${category.name}/${post.title}`}>show</Link>
            ) : (
                <Link to={`${match.url}/other/${post.title}`}>show</Link>
            )}
        </div>

    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

export default PostItem;
