import { call, put, spawn } from "redux-saga/effects";
import axios from "axios";
import { setCategories } from "./category";
import { setPosts } from "./post";
import { Settings } from "../config/settings";
import { showErrors } from "./message";

const baseLink = new Settings().apiUrl;

// logic
function* tryLoadResources() {
  try {
    const response = yield call(() =>
      axios({
        method: "get",
        url: baseLink + "/first-load-resources",
      })
    );

    yield put(setCategories(response.data.categories));
    yield put(setPosts(response.data.posts));
  } catch (e) {
    yield put(showErrors(e.response.data.error));
  }
}

export const resources = function* () {
  yield spawn(tryLoadResources);
};
