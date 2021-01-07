import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Header.module.scss";
import SignUpForm from "../../auth/signUpForm";
import SignInForm from "../../auth/signInForm";
import SignOutButton from "../../auth/signOutButton";

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
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="#">RubyDump</a>
      </div>
      <input
        className={styles.menu__btn}
        type="checkbox"
        id={styles.menu__btn}
      />
      <label className={styles.menu__icon} htmlFor={styles.menu__btn}>
        <span className={styles.navicon} />
      </label>
      {!isSignedIn && (
        <ul className={styles.menu}>
          <li>
            <a onClick={showSignUpForm.bind(null)}>sign-up</a>
          </li>
          <li>
            <a onClick={showSignInForm.bind(null)}>sign-in</a>
          </li>
        </ul>
      )}

      {isSignedIn && <SignOutButton />}

      <SignUpForm showed={signUpFormState} hideSignUpForm={hideSignUpForm} />
      <SignInForm showed={signInFormState} hideSignInForm={hideSignInForm} />
    </header>
  );
}
