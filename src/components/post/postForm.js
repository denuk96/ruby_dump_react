import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/loader";
import { useLocation } from "react-router-dom";
import { tryCreatePost, tryEditPost } from "../../ducks/post";

export default function PostForm() {
  const { register, handleSubmit, errors } = useForm();
  const showLoading = useSelector((state) => state.postReducer.loading);
  // const errorsFromServer = useSelector(
  //   (state) => state.authReducer.errors_from_server
  // );
  const dispatch = useDispatch();
  const location = useLocation();

  let isEditing = false;
  let post = null;
  if (location.state.post) {
    isEditing = true;
    post = location.state.post;
  }

  function onSubmit(data) {
    let { title, body } = data;
    if (isEditing) {
      dispatch(tryEditPost(post.id, title, body));
    } else {
      dispatch(tryCreatePost(title, body));
    }
  }

  if (showLoading) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        type="text"
        name="title"
        placeholder="TITLE"
        value={isEditing && post ? post.title : ""}
        ref={register({ required: true })}
      />
      {errors.title && <span>Title is required</span>}

      <Form.Control
        type="text"
        name="body"
        placeholder="Right smth here"
        value={isEditing && post ? post.body : ""}
        ref={register({ required: true })}
      />
      {errors.body && <span>BODY is required</span>}

      <Button type="submit" />
    </Form>
  );
}
