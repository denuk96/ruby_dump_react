import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import styles from "./Post.module.scss";

function trimText(text, length = 100, end = ' ...') {
    let index = text.indexOf(" ", length);
    if( index === -1 ) index = length;

    return text.slice(0, index) + end;
}

function PostItem({ post, category }) {
  let match = useRouteMatch();

    return (
        category ? (
            <Link to={`${match.url}/${category.name}/${post.title}`}>
                <div className={styles.post}>
                    <div className={styles.post__card}>
                        <h5 className={"mt-3 ml-3 text-capitalize text-white"}>{post.title}</h5>
                        <p className={"p-3 text-white-100"}>{ trimText(post.body) }</p>
                    </div>
                </div>
            </Link>
        ) : (
            <Link to={`${match.url}/other/${post.title}`}>
                <div className={styles.post}>
                    <div className={styles.post__card}>
                        <h5 className={"mt-3 ml-3 text-capitalize text-white"}>{post.title}</h5>
                        <p className={"p-3 text-white-100"}>{ trimText(post.body) }</p>

                    </div>
                </div>
            </Link>
        )
    );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

export default PostItem;
