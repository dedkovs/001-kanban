import { combineReducers } from "redux";
import app from "./slices/app";

const rootReducer = combineReducers({
  app,
});

export default rootReducer;
