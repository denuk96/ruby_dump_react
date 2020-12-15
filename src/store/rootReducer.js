import { combineReducers } from "redux";
import messageReducer from "../ducks/message";
import authReducer from "../ducks/auth";
import categoryReducer from "../ducks/category";
import postReducer from "../ducks/post";

export default combineReducers({
  authReducer,
  messageReducer,
  categoryReducer,
  postReducer,
});
