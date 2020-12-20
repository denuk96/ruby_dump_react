import { Record } from "immutable";

// SELECTORS

export const getCategories = (state) => state.categoryReducer.categories;

// TYPES
const moduleName = "categories";

export const SET_CATEGORIES = `${moduleName}/setCategories`;

// REDUCER

const ReducerRecord = Record({
  categories: [],
  loaded: false,
});

export default function categoryReducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return (state = {
        ...state,
        categories: payload.categories,
        loaded: true,
      });

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
