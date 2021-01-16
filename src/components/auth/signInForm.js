import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./Auth.module.scss";
import { signInTry } from "../../ducks/auth";
import { Loader } from "../common/loader/loader";

function SignInForm({ showed, hideSignInForm }) {
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
      <Modal show={showed} onHide={hideSignInForm} dialogClassName="modal-sm">
        <Modal.Header closeButton />
        <Modal.Body>
          <Loader />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={showed} onHide={hideSignInForm} dialogClassName="modal-sm">
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorsFromServer != null && (
          <div className={styles.server_error}>{errorsFromServer}</div>
        )}
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="email">Email</label>
          <Form.Control
            type="email"
            name="email"
            ref={register({ required: true })}
          />
          {errors.email && (
            <div className="form__validation_error">Email is required</div>
          )}

          <label className="mt-2" htmlFor="password">
            Password
          </label>
          <Form.Control
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          {errors.password && (
            <div className="form__validation_error">Password is required</div>
          )}

          <button type="submit" className={styles.form__submit}>
            sign in
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

SignInForm.propTypes = {
  showed: PropTypes.bool,
  hideSignInForm: PropTypes.func.isRequired,
};

export default SignInForm;
