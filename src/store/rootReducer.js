import { combineReducers } from "redux";
import messageReducer from "../ducks/message";
import authReducer from "../ducks/auth";

export default combineReducers({
  authReducer,
  messageReducer,
});
