import { spawn } from "redux-saga/effects";
import { auth } from "../ducks/auth";
import { resources } from "../ducks/resourses";

export default function* () {
  yield spawn(auth);
  yield spawn(resources);
}
