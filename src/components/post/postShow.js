import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { showErrors } from "../../ducks/message";
import EditPostButton from "./buttons/editPostButton";
import DeletePostButton from "./buttons/deletePostButton";
import { Loader } from "../common/loader";

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
    <div>
      <b>title: {post.title}</b>
      <p>category_id: {post.category_id}</p>
      <p>
        <EditPostButton post={post} />
      </p>
      <p>
        <DeletePostButton post={post} />
      </p>
    </div>
  );
}
