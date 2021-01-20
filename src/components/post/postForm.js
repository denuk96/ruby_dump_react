import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/loader/loader";
import { useLocation } from "react-router-dom";
import { tryCreatePost, tryEditPost } from "../../ducks/post";

export default function PostForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const showLoading = useSelector((state) => state.postReducer.loading);
  const categories = useSelector((state) => state.categoryReducer.categories);

  let isEditing = false;
  let post = null;
  if (location.state && location.state.post) {
    isEditing = true;
    post = location.state.post;
  }

  function onSubmit(data) {
    let { title, body, categoryId } = data;
    let category_id = categoryId === "0" ? null : categoryId;
    if (isEditing) {
      dispatch(tryEditPost(post.id, title.trim(), body.trim(), category_id));
    } else {
      dispatch(
        tryCreatePost({
          title: title.trim(),
          body: body.trim(),
          category_id,
        })
      );
    }
  }

  if (showLoading) {
    return <Loader />;
  }

  return (
    <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="categoryId">Category</label>
        <Form.Control
          type="select"
          as="select"
          name="categoryId"
          ref={register}
          defaultValue={isEditing ? post.category_id : 0}
        >
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
          <option value={0}>Other</option>
        </Form.Control>

        <label htmlFor="title">Title</label>
        <Form.Control
          type="text"
          name="title"
          placeholder="TITLE"
          defaultValue={isEditing && post ? post.title : ""}
          ref={register({ required: true })}
        />
        {errors.title && (
          <div className="form__validation_error">Title is required</div>
        )}

        <label htmlFor="body">Body</label>
        <Form.Control
          type="text"
          name="body"
          placeholder="Right smth here"
          defaultValue={isEditing && post ? post.body : ""}
          ref={register({ required: true })}
        />
        {errors.body && (
          <div className="form__validation_error">BODY is required</div>
        )}

        <button className="col-sm-4 offset-sm-4 col-xs-12" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
