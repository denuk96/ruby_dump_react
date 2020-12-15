import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export default function PostShow() {
  const posts = useSelector((state) => state.postReducer.posts);
  let { slug } = useParams();
  const post = posts.find((post) => post.title === slug);

  return (
    <div>
      <b>title: {post.title}</b>
      <p>category_id: {post.category_id}</p>
    </div>
  );
}
