const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (username, conversationId) => {
  return {
    type: SET_ACTIVE_CHAT,
    username,
    conversationId
  };
};

const reducer = (state = {username:"", conversationId:""}, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return {username:action.username, conversationId:action.conversationId};
    }
    default:
      return state;
  }
};

export default reducer;
