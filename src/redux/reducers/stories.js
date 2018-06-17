import _ from "lodash";

const receiveNewStories = "STORIES:RECEIVE_NEW_STORIES";

const onReceiveNewStories = newStories => {
  return {
    type: receiveNewStories,
    payload: {
      newStories,
    },
  };
};

export const actionTypes = {
  receiveNewStories,
};

export const actions = {
  onReceiveNewStories,
};

export default (state = [], action) => {
  switch (action.type) {
    case receiveNewStories:
      if (state.length === 0) {
        return _.sortBy(action.payload.newStories, ["when", "createAt"]);
      } else {
        return _.sortBy([...state, action.payload.newStories], ["when", "createAt"]);
      }
    default:
      return state;
  }
};
