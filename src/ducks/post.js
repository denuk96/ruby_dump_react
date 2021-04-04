import { Record } from "immutable";
import { put, takeLatest, call, select } from "redux-saga/effects";
import history from "../config/history";
import axios from "axios";
import { getAccessToken } from "./auth";
import { showErrors, showNotices } from "./message";
import { getCategories } from "./category";
import { postBodyData } from "../tools/duckTools";

// TYPES
const moduleName = "posts";

const baseLink = process.env.REACT_APP_API_URL + "/posts/";

export const SET_POSTS = `${moduleName}/setPosts`;
export const TRY_CREATE_POST = `${moduleName}/tryCreatePost`;
export const POST_SUCCESSFUL_CREATED = `${moduleName}/postSuccessfulCreated`;
export const TRY_EDIT_POST = `${moduleName}/tryEditPost`;
export const POST_SUCCESSFUL_EDITED = `${moduleName}/postSuccessfulEdited`;
export const POST_IS_LOADING = `${moduleName}/postLoading`;
export const POST_IS_NOT_LOADING = `${moduleName}/postNotLoading`;
export const TRY_DELETE_POST = `${moduleName}/tryDeletePost`;
export const POST_SUCCESSFUL_DELETED = `${moduleName}/postSuccessfulDeleted`;

// REDUCER

const ReducerRecord = Record({
  posts: [],
  loading: true,
});

export default function postReducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return (state = { ...state, posts: payload.posts, loading: false });

    case POST_IS_LOADING:
      return (state = { ...state, loading: true });

    case POST_IS_NOT_LOADING:
      return (state = { ...state, loading: false });

    case POST_SUCCESSFUL_CREATED:
      return (state = {
        ...state,
        loading: false,
        posts: state.posts.concat(payload.post),
      });

    case POST_SUCCESSFUL_EDITED:
      return (state = {
        ...state,
        loading: false,
        posts: state.posts.map((post) => {
          if (payload.post.id === post.id) {
            post = Object.assign(post, payload.post);
          }
          return post;
        }),
      });

    case POST_SUCCESSFUL_DELETED:
      return (state = {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== payload.id),
      });

    default:
      return state;
  }
}

// ACTION CREATORS

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: {
      posts: posts,
    },
  };
};

export const postIsLoading = () => {
  return {
    type: POST_IS_LOADING,
  };
};

export const postIsNotLoading = () => {
  return {
    type: POST_IS_NOT_LOADING,
  };
};

export const tryCreatePost = (post) => {
  return {
    type: TRY_CREATE_POST,
    payload: {
      post,
    },
  };
};

export const postSuccessfulCreated = (post) => {
  return {
    type: POST_SUCCESSFUL_CREATED,
    payload: {
      post,
    },
  };
};

export const tryEditPost = (id, title, body, category_id, picture) => {
  return {
    type: TRY_EDIT_POST,
    payload: {
      id,
      title,
      body,
      category_id,
      picture,
    },
  };
};

export const postSuccessfulEdited = (post) => {
  return {
    type: POST_SUCCESSFUL_EDITED,
    payload: {
      post,
    },
  };
};

export const tryDeletePost = (id) => {
  return {
    type: TRY_DELETE_POST,
    payload: {
      id,
    },
  };
};

export const postDeleted = (id) => {
  return {
    type: POST_SUCCESSFUL_DELETED,
    payload: {
      id,
    },
  };
};

// logic
function* tryingCreatePost(action) {
  yield put(postIsLoading());
  const accessToken = yield select(getAccessToken);
  const bodyData = postBodyData(action.payload.post);

  try {
    const response = yield call(() =>
      axios({
        method: "post",
        url: baseLink,
        data: bodyData,
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
    );
    yield put(postSuccessfulCreated(response.data));
    yield put(showNotices("Post created"));

    const redirectPath = yield redirectToPostPath(response.data);
    history.push(redirectPath);
  } catch (e) {
    yield put(showErrors(e.response.data.error));
    yield put(postIsNotLoading());
  }
}

function* tryingEditPost(action) {
  yield put(postIsLoading());
  const accessToken = yield select(getAccessToken);
  const bodyData = postBodyData(action.payload);

  console.log(bodyData);
  try {
    const response = yield call(() =>
      axios({
        method: "PATCH",
        url: baseLink + action.payload.id,
        data: bodyData,
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
    );
    yield put(postSuccessfulEdited(response.data));
    yield put(showNotices("Post updated"));

    const redirectPath = yield redirectToPostPath(response.data);
    history.push(redirectPath);
  } catch (e) {
    yield put(showErrors(e.response.data.error));
    yield put(postIsNotLoading());
  }
}

function* tryingDeletePost(action) {
  yield put(postIsLoading());
  const accessToken = yield select(getAccessToken);
  try {
    yield call(() =>
      axios({
        method: "DELETE",
        url: baseLink + action.payload.id,
        headers: { Authorization: accessToken },
      })
    );
    yield call(history.push, "/posts");

    yield put(postDeleted(action.payload.id));
    yield put(showNotices("Post Deleted"));
  } catch (e) {
    yield put(showErrors(e.response.data.error));
    yield put(postIsNotLoading());
  }
}

function* redirectToPostPath(post) {
  const categories = yield select(getCategories);
  const post_category = categories.find(
    (category) => category.id === post.category_id
  );
  if (post_category) {
    return `${post_category.name}/${post.title}`;
  } else {
    return `other/${post.title}`;
  }
}

export const post = function* () {
  yield takeLatest(TRY_CREATE_POST, tryingCreatePost);
  yield takeLatest(TRY_EDIT_POST, tryingEditPost);
  yield takeLatest(TRY_DELETE_POST, tryingDeletePost);
};
