import { Record } from "immutable";

// TYPES
const moduleName = "posts";

export const SET_POSTS = `${moduleName}/setPosts`;

// REDUCER

const ReducerRecord = Record({
  posts: [],
});

export default function postReducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return (state = { ...state, posts: payload.posts });

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
