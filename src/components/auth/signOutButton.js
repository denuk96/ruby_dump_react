import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../ducks/auth";

export default function SignOutButton() {
  const dispatch = useDispatch();

  function signOutUser() {
    dispatch(signOut());
  }

  return <a onClick={signOutUser}>Sign Out</a>;
}
