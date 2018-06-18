import { put, takeEvery } from "redux-saga/effects";
import firebase from "react-native-firebase";
import uuidv1 from "uuid/v1";
import _ from "lodash";

import { actionTypes as storiesActionTypes } from "../reducers/stories";

const storiesCollection = firebase.firestore().collection("stories");

export function* addNewStory(action) {
  const uuid = uuidv1();
  const { image, currentUser, when, whatHappened } = action.payload.newStory;

  try {
    const storeImageRes = yield firebase
      .storage()
      .ref(`story-photos/${uuid}.jpg`)
      .putFile(image.path, { contentType: image.mime });

    yield storiesCollection.add({
      createAt: new Date(),
      creator: currentUser.email,
      creatorAvatar: currentUser.photoURL,
      whatHappened: whatHappened,
      when: when,
      photo: `story-photos/${uuid}.jpg`,
      photoURL: storeImageRes.downloadURL,
    });

    yield put({ type: storiesActionTypes.ADD_NEW_STORY_SUCCESS });
  } catch (e) {
    yield put({ type: storiesActionTypes.ADD_NEW_STORY_FAILED, payload: e });
  }
}

export function* giveStoryLove(action) {
  const { id, amount } = action.payload;
  const storyDocRef = storiesCollection.doc(id);

  try {
    yield firebase.firestore().runTransaction(transaction => {
      return transaction.get(storyDocRef).then(storyDoc => {
        const currentLoveAmount = storyDoc.data().love;

        if (!currentLoveAmount) {
          transaction.update(storyDocRef, { love: amount });
        } else {
          transaction.update(storyDocRef, { love: currentLoveAmount + amount });
        }
      });
    });
    yield put({ type: storiesActionTypes.GIVE_STORY_LOVE_SUCCESS });
  } catch (e) {
    yield put({ type: storiesActionTypes.GIVE_STORY_LOVE_FAILED, payload: e });
  }
}

export function* refreshStories() {
  try {
    const stories = yield storiesCollection.get().then(res => _.map(res.docs, doc => doc.data()));
    yield put({ type: storiesActionTypes.REFRESH_STORIES_SUCCESS, payload: { stories } });
  } catch (e) {
    yield put({ type: storiesActionTypes.REFRESH_STORIES_FAILED, payload: e });
  }
}

export function* watchAddNewStory() {
  yield takeEvery(storiesActionTypes.ADD_NEW_STORY, addNewStory);
}
export function* watchGiveStoryLove() {
  yield takeEvery(storiesActionTypes.GIVE_STORY_LOVE, giveStoryLove);
}
export function* watchRefreshStories() {
  yield takeEvery(storiesActionTypes.REFRESH_STORIES, refreshStories);
}
