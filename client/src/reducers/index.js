import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import listReducer from "./listReducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  theaters : listReducer,
});