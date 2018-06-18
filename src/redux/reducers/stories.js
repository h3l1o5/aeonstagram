import _ from "lodash";

const RECEIVE_NEW_STORIES = "STORIES:RECEIVE_NEW_STORIES";
const REFRESH_STORIES = "STORIES:REFRESH_STORIES";
const REFRESH_STORIES_SUCCESS = "STORIES:REFRESH_STORIES_SUCCESS";
const REFRESH_STORIES_FAILED = "STORIES:REFRESH_STORIES_FAILED";
const ADD_NEW_STORY = "STORIES:ADD_NEW_STORY";
const ADD_NEW_STORY_SUCCESS = "STORIES:ADD_NEW_STORY_SUCCESS";
const ADD_NEW_STORY_FAILED = "STORIES:ADD_NEW_STORY_FAILED";
const GIVE_STORY_LOVE = "STORIES:GIVE_STORY_LOVE";
const GIVE_STORY_LOVE_SUCCESS = "STORIES:GIVE_STORY_LOVE_SUCCESS";
const GIVE_STORY_LOVE_FAILED = "STORIES:GIVE_STORY_LOVE_FAILED";

const onReceiveNewStories = newStories => ({
  type: RECEIVE_NEW_STORIES,
  payload: {
    newStories,
  },
});

const refreshStories = () => ({
  type: REFRESH_STORIES,
});

const addNewStory = newStory => ({
  type: ADD_NEW_STORY,
  payload: {
    newStory,
  },
});

const giveStoryLove = (id, amount) => ({
  type: GIVE_STORY_LOVE,
  payload: {
    id,
    amount,
  },
});

export const actionTypes = {
  RECEIVE_NEW_STORIES,
  REFRESH_STORIES,
  REFRESH_STORIES_SUCCESS,
  REFRESH_STORIES_FAILED,
  ADD_NEW_STORY,
  ADD_NEW_STORY_SUCCESS,
  ADD_NEW_STORY_FAILED,
  GIVE_STORY_LOVE,
  GIVE_STORY_LOVE_SUCCESS,
  GIVE_STORY_LOVE_FAILED,
};

export const actions = { onReceiveNewStories, refreshStories, addNewStory, giveStoryLove };

export default (state = { data: [], isOnRefreshing: false }, action) => {
  switch (action.type) {
    case RECEIVE_NEW_STORIES:
      if (state.data.length === 0) {
        return { ...state, data: _.sortBy(action.payload.newStories, ["when", "createAt"]) };
      } else {
        return { ...state, data: _.sortBy([...state.data, ...action.payload.newStories], ["when", "createAt"]) };
      }
    case REFRESH_STORIES:
      return { ...state, isOnRefreshing: true };
    case REFRESH_STORIES_SUCCESS:
      return { data: action.payload.stories, isOnRefreshing: false };
    case REFRESH_STORIES_FAILED:
      return { ...state, isOnRefreshing: false };
    case ADD_NEW_STORY:
      return state;
    case ADD_NEW_STORY_SUCCESS:
      return state;
    case ADD_NEW_STORY_FAILED:
      return state;
    case GIVE_STORY_LOVE:
      return state;
    case GIVE_STORY_LOVE_SUCCESS:
      const stories = _.map(state.data, story => {
        if (story.id === action.payload.id) {
          story.love = story.love + action.payload.amount;
        }

        return story;
      });

      return { ...state, data: stories };
    case GIVE_STORY_LOVE_FAILED:
      return state;
    default:
      return state;
  }
};
