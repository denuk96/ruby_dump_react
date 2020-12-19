import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { signUpTry } from "../../ducks/auth";
import { Loader } from "../common/loader";

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
      <Modal show={showed} onHide={hideSignUpForm}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Loader />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={showed} onHide={hideSignUpForm}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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

          <Form.Control
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            ref={register({
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.passwordConfirmation && <span>password is not matched</span>}

          <Button type="submit" />
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
