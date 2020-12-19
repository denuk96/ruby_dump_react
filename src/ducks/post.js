import { Record } from "immutable";
import { put, spawn, takeLatest } from "redux-saga/effects";

// TYPES
const moduleName = "posts";

export const SET_POSTS = `${moduleName}/setPosts`;
export const TRY_CREATE_POST = `${moduleName}/tryCreatePost`;
export const POST_SUCCESSFUL_CREATED = `${moduleName}/postSuccessfulCreated`;
export const TRY_EDIT_POST = `${moduleName}/tryEditPost`;
export const POST_SUCCESSFUL_EDITED = `${moduleName}/postSuccessfulEdited`;
export const POST_IS_LOADING = `${moduleName}/postLoading`;

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

export const tryCreatePost = (title, body) => {
  return {
    type: TRY_CREATE_POST,
    payload: {
      title,
      body,
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

export const post = function* () {
  yield takeLatest(TRY_CREATE_POST, tryingCreatePost);
  yield takeLatest(TRY_EDIT_POST, tryingEditPost);
};
