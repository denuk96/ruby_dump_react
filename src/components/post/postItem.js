import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function PostItem({ post, category }) {
  let match = useRouteMatch();

  return (
    <div>
      <b>title: {post.title}</b>
      <p>category_id: {post.category_id}</p>
      <Link to={`${match.url}/${category.name}/${post.title}`}>show</Link>
    </div>
  );
}
