import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { showErrors } from "../../ducks/message";

export default function PostShow() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  let { slug } = useParams();
  const post = posts.find((post) => post.title === slug);

  if (!post) {
    dispatch(showErrors(`Cant find post ${slug}`));
    history.push("/posts");
    return <></>;
  }

  return (
    <div>
      <b>title: {post.title}</b>
      <p>category_id: {post.category_id}</p>
      <Link
        to={{
          pathname: "/posts/edit",
          state: { post: post },
        }}
      >
        EDIT
      </Link>
    </div>
  );
}
