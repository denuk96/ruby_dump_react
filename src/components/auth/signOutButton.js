import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { signOut } from "../../ducks/auth";

export default function SignOutButton() {
  const dispatch = useDispatch();

  function signOutUser() {
    dispatch(signOut());
  }

  return (
    <Button variant="primary" onClick={signOutUser}>
      Sign Out
    </Button>
  );
}
