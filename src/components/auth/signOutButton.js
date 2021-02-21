import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../ducks/auth";

export default function SignOutButton() {
  const dispatch = useDispatch();

  function signOutUser() {
    dispatch(signOut());
  }

  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a onClick={signOutUser}>Sign Out</a>;
}
