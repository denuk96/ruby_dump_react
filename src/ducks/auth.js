import { spawn, takeLatest, put, call } from "redux-saga/effects";
import { Record } from "immutable";
// import {getData, postData} from "../api/apiDataFetch";
import { showErrors } from "./message";

// TYPES
const moduleName = "auth";

const link = "https://young-chamber-53830.herokuapp.com/";

export const AUTH_IS_LOADING = `${moduleName}/signInLoading`;
export const SIGN_IN_TRY = `${moduleName}/signInTry`;
export const SIGN_UP_TRY = `${moduleName}/signUpTry`;
export const SIGN_IN_SUCCESS = `${moduleName}/signInSuccess`;
export const SIGN_OUT = `${moduleName}/signOut`;
export const SET_ERROR = `${moduleName}/setError`;
export const CLEAR_ERROR = `${moduleName}/clearError`;

// SELECTORS
export const getAuthStat = (state) => state.authReducer;
export const getUserSignedIN = (state) => state.authReducer.signedIn;
export const getAccessToken = (state) => state.authReducer.access_token;

// REDUCER
const ReducerRecord = Record({
  user: null,
  signedIn: false,
  loading: false,
  access_token: null,
  errors_from_server: null,
});

export default function authReducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
      return state
        .set("access_token", payload.access_token)
        .set("user", payload.user)
        .set("signedIn", true)
        .set("errors_from_server", null)
        .set("loading", false);

    case SIGN_OUT:
      return state
        .set("access_token", null)
        .set("signedIn", false)
        .set("user", null);

    case SET_ERROR:
      return state.set("errors_from_server", payload).set("loading", false);

    case CLEAR_ERROR:
      return state.set("errors_from_server", null);

    case AUTH_IS_LOADING:
      return state.set("loading", true);

    default:
      return state;
  }
}

// ACTION CREATORS
export const authLoading = () => ({
  type: AUTH_IS_LOADING,
});

export const signInTry = (email, password) => ({
  type: SIGN_IN_TRY,
  payload: {
    email: email,
    password: password,
  },
});

export const signIn = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    access_token: user.access_token,
    user: user,
  },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const signUpTry = (params) => ({
  type: SIGN_UP_TRY,
  payload: {
    email: params.email,
    password: params.password,
  },
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

// logic
function* initAuthSaga() {
  const localTokens = window.localStorage.getItem("access_token");
  try {
    const response = yield call();
    // getData, `${link}user_info/`, 'GET', localTokens
    if (response.code === 200) {
      yield call(singInUser, response.body);
    }
  } catch (e) {
    yield put(showErrors("Auth server error"));
  }
}

function* signInRequest(action) {
  yield put(authLoading());
  try {
    const response = yield call();
    // postData, `${link}sign_in`, 'POST', action.payload
    if (response.code === 200) {
      yield call(singInUser, response.body);
    } else {
      yield put(setError(response.body.errors));
    }
  } catch (e) {
    yield put(setError("server-error"));
  }
}

function* tryToSignUp(action) {
  yield put(authLoading());
  try {
    const response = yield call();
    // postData, `${link}sign_up`, 'POST', action.payload
    if (response.code === 200) {
      yield call(singInUser, response.body);
    } else {
      yield put(setError(response.body.errors));
    }
  } catch (e) {
    yield put(setError("server-error"));
  }
}

function* singInUser(body) {
  window.localStorage.setItem("access_token", body.access_token);
  yield put(signIn(body));
}

function* signOutUser() {
  yield call(() => {
    return window.localStorage.removeItem("access_token");
  });
}

export const auth = function* () {
  yield spawn(initAuthSaga);
  yield takeLatest(SIGN_IN_TRY, signInRequest);
  yield takeLatest(SIGN_UP_TRY, tryToSignUp);
  yield takeLatest(SIGN_OUT, signOutUser);
};
