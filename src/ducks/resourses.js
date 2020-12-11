import { Record } from "immutable";
import { call, put, spawn, takeLatest } from "redux-saga/effects";
import axios from "axios"
import { setCategories } from "./category";

// logic
function* tryLoadResources() {
  try {
    const response = {
    	data: {
    		categories: [
			    {id: 44, name: 'first_category'},
			    {id: 55, name: 'second_category'}
		    ]
	    }
    };

    yield put(setCategories(response.data.categories))
  } catch (e) {
    // yield put(setError(e.response.data.error));
  }
}

export const resources = function* () {
  yield spawn(tryLoadResources);
};
