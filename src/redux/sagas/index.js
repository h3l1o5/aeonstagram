import { all } from "redux-saga/effects";

import { watchAddNewStory, watchGiveStoryLove, watchRefreshStories } from "./stories";

export default function* rootSaga() {
  yield all([watchAddNewStory(), watchGiveStoryLove(), watchRefreshStories()]);
}
