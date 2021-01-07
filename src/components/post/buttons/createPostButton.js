import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatePostButton() {
  const isSignedIn = useSelector((state) => state.authReducer.isSignedIn);

  return <>{isSignedIn && <Link to="/posts/new">Create new POST </Link>}</>;
}
