import { spawn } from "redux-saga/effects";
import { auth } from "../ducks/auth";
import { resources } from "../ducks/resourses";
import { post } from "../ducks/post";

export default function* () {
  yield spawn(auth);
  yield spawn(resources);
  yield spawn(post);
}
