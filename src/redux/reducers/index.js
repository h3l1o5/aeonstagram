import { combineReducers } from "redux";
import storiesReducer from "./stories";

export default combineReducers({
  stories: storiesReducer,
});
