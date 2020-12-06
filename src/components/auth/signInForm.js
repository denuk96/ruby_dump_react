import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signInTry } from "../../ducks/auth";
import { Button, Form, Modal } from "react-bootstrap";
import { Loader } from "../common/loader";

export default function SignInForm({ showed, hideSignInForm }) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const showLoading = useSelector((state) => state.authReducer.loading);
  const errorsFromServer = useSelector(
    (state) => state.authReducer.errors_from_server
  );

  function onSubmit(data) {
    let { email, password } = data;
    dispatch(signInTry(email, password));
  }

  if (showLoading) {
    return (
      <Modal show={showed} onHide={hideSignInForm}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Loader />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={showed} onHide={hideSignInForm}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorsFromServer != null && (
          <h4 className="warning-message">{errorsFromServer}</h4>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
          />
          {errors.email && <span>password is required</span>}

          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.password && <span>password is required</span>}

          <Button type="submit" />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
