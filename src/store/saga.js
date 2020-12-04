import { spawn } from "redux-saga/effects";
import { auth } from "../ducks/auth";

export default function* () {
  yield spawn(auth);
}
