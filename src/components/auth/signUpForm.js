import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Auth.module.scss";
import { signUpTry } from "../../ducks/auth";
import { Loader } from "../common/loader/loader";

function SignUpForm({ showed, hideSignUpForm }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const showLoading = useSelector((state) => state.authReducer.loading);
  const errorsFromServer = useSelector(
    (state) => state.authReducer.errors_from_server
  );

  function onSubmit(data) {
    let { email, password } = data;
    dispatch(signUpTry({ email, password }));
  }

  if (showLoading) {
    return (
      <Modal show={showed} onHide={hideSignUpForm} dialogClassName="modal-sm">
        <Modal.Header closeButton />
        <Modal.Body>
          <Loader />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={showed} onHide={hideSignUpForm} dialogClassName="modal-sm">
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
            <div className={styles.form__validation_error}>
              Email is required
            </div>
          )}

          <label className="mt-2" htmlFor="password">
            Password
          </label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.password && (
            <div className="form__validation_error">Password is required</div>
          )}

          <label className="mt-2" htmlFor="passwordConfirmation">
            Password confirmation
          </label>
          <Form.Control
            type="password"
            name="passwordConfirmation"
            ref={register({
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.passwordConfirmation && (
            <div className="form__validation_error">
              password is not matched
            </div>
          )}

          <button type="submit" className={styles.form__submit}>
            Sign up
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

SignUpForm.propTypes = {
  showed: PropTypes.bool,
  hideSignUpForm: PropTypes.func.isRequired,
};

export default SignUpForm;
