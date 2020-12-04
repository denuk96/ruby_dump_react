import React, { useState } from "react";
import SignInForm from "../auth/signInForm";

export default function Header() {
  const [signInFormState, setSignInForm] = useState(false);

  function toggleSignInForm() {
    setSignInForm(!signInFormState);
  }

  return (
    <header>
      <button className="btn btn-primary" onClick={toggleSignInForm.bind()}>
        sign-up
      </button>

      <SignInForm
        showed={signInFormState}
        toggleSignInForm={toggleSignInForm}
      />
    </header>
  );
}
