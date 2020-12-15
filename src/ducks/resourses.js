import { Record } from "immutable";
import { call, put, spawn, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { setCategories } from "./category";
import { setPosts } from "./post";

// logic
function* tryLoadResources() {
  try {
    const response = {
      data: {
        categories: [
          { id: 44, name: "first_category" },
          { id: 55, name: "second_category" },
        ],
        posts: [
          { id: 123, title: "first_post", category_id: 44 },
          { id: 124, title: "second_post", category_id: 44 },
          { id: 125, title: "third_post", category_id: 55 },
        ],
      },
    };

    yield put(setCategories(response.data.categories));
    yield put(setPosts(response.data.posts));
  } catch (e) {
    // yield put(setError(e.response.data.error));
  }
}

export const resources = function* () {
  yield spawn(tryLoadResources);
};
