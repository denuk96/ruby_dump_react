import { Record } from "immutable";
import { put, takeLatest, call, select } from "redux-saga/effects";
import axios from "axios";
import { getAccessToken } from "./auth";
import { showErrors, showNotices } from "./message";
import { getCategories } from "./category";

// TYPES
const moduleName = "posts";

const baseLink = process.env.REACT_APP_API_URL + "/posts";

export const SET_POSTS = `${moduleName}/setPosts`;
export const TRY_CREATE_POST = `${moduleName}/tryCreatePost`;
export const POST_SUCCESSFUL_CREATED = `${moduleName}/postSuccessfulCreated`;
export const TRY_EDIT_POST = `${moduleName}/tryEditPost`;
export const POST_SUCCESSFUL_EDITED = `${moduleName}/postSuccessfulEdited`;
export const POST_IS_LOADING = `${moduleName}/postLoading`;
export const POST_IS_NOT_LOADING = `${moduleName}/postNotLoading`;

// REDUCER

const ReducerRecord = Record({
  posts: [],
  loading: false,
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

export const tryEditPost = (id, title, body) => {
  return {
    type: TRY_EDIT_POST,
    payload: {
      id,
      title,
      body,
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

// logic
function* tryingCreatePost(action) {
  yield put(postIsLoading());
  const accessToken = yield select(getAccessToken);
  let { title, body, category_id } = action.payload.post;
  try {
    const response = yield call(() =>
      axios({
        method: "post",
        url: baseLink,
        dataType: "json",
        data: { body, title, category_id },
        headers: { Authorization: accessToken },
      })
    );
    yield put(postSuccessfulCreated(response.data));
    yield put(showNotices("Post created"));

    const redirectPath = redirectToPostPath(response.data);
    yield call(replace, redirectPath);
  } catch (e) {
    yield put(showErrors(e.response.data.post_errors));
    yield put(postIsNotLoading());
  }
}

function* tryingEditPost(action) {
  yield put(postIsLoading());
  try {
    //     const response = yield call(() =>
    //       axios({
    //         method: "post",
    //         url: baseLink + "/sign-in",
    //         data: action.payload,
    //       })
    //     );
    //     yield call(singInUser, response.data);
  } catch (e) {
    //     yield put(setError(e.response.data.error));
  }
}

function* redirectToPostPath(post) {
  console.log(post);
  const categories = yield select(getCategories);
  const post_category = categories.find(
    (category) => category.id === post.category_id
  );
  if (post_category) {
    console.log(`posts/${post_category.name}/${post.title}`);
    return `posts/${post_category.name}/${post.title}`;
  } else {
    return "/";
  }
}

export const post = function* () {
  yield takeLatest(TRY_CREATE_POST, tryingCreatePost);
  yield takeLatest(TRY_EDIT_POST, tryingEditPost);
};
