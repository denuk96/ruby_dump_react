import React, { useState } from "react";
import { useSelector } from "react-redux";
import SignUpForm from "../auth/signUpForm";
import SignInForm from "../auth/signInForm";
import SignOutButton from "../auth/signOutButton";

export default function Header() {
  const isSignedIn = useSelector((state) => state.authReducer.isSignedIn);
  const [signUpFormState, setSignUpForm] = useState(false);
  const [signInFormState, setSignInForm] = useState(false);
  if (isSignedIn && (signUpFormState || signInFormState)) {
    setSignUpForm(false);
    setSignInForm(false);
  }

  const showSignUpForm = () => setSignUpForm(true);
  const hideSignUpForm = () => setSignUpForm(false);
  const showSignInForm = () => setSignInForm(true);
  const hideSignInForm = () => setSignInForm(false);

  return (
    <header>
      {!isSignedIn && (
        <>
          <button
            className="btn btn-primary"
            onClick={showSignUpForm.bind(null)}
          >
            sign-up
          </button>
          <button
            className="btn btn-primary"
            onClick={showSignInForm.bind(null)}
          >
            sign-in
          </button>
        </>
      )}

      {isSignedIn && <SignOutButton />}

      <SignUpForm showed={signUpFormState} hideSignUpForm={hideSignUpForm} />
      <SignInForm showed={signInFormState} hideSignInForm={hideSignInForm} />
    </header>
  );
}
