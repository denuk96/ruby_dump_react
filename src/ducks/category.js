import { Record } from "immutable";

// TYPES
const moduleName = "categories";

export const SET_CATEGORIES = `${moduleName}/setCategories`;

// REDUCER

const ReducerRecord = Record({
  categories: [],
});

export default function categoryReducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return (state = { ...state, categories: payload.categories });

    default:
      return state;
  }
}

// ACTION CREATORS

export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: {
      categories: categories,
    },
  };
};
