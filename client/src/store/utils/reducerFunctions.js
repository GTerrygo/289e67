export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadCount: !message.isRead && message.senderId === sender.id ? 1 : 0
    };
    newConvo.latestMessage = message;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = {...convo}
      convoCopy.messages.push(message);
      convoCopy.latestMessage = message;
      convoCopy.unreadCount = !message.isRead && message.senderId === convoCopy.otherUser.id ? convoCopy.unreadCount + 1 : convoCopy.unreadCount
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [], latestMessage: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = {...convo}
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessage = message;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const clearUnReadCount = (state, conversationId) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = {...convo}
      if(convoCopy.unreadCount > 0){
          convoCopy.messages.forEach((message)=>{
            if(!message.isRead && message.senderId === convoCopy.otherUser.id){
              message.isRead = true
            }
          })
      }
      convoCopy.unreadCount = 0;
      return convoCopy;
    } else {
      return convo;
    }
  })
}

export const updateMessageRead = (state, payload) => {
  return state.map((convo) => {
    if (convo.id === payload.conversationId) {
      const convoCopy = {...convo}
      for(let i=convoCopy.messages.length-1; i>=0 ;i--){
        if(convoCopy.messages[i].id === payload.messageId){
          convoCopy.messages[i].isRead = true
          break
        }
        //update all messages form other user as read
        if(payload.messageId === -1 && convoCopy.messages[i].senderId !== convoCopy.otherUser.id){
          if(convoCopy.messages[i].isRead) break
          convoCopy.messages[i].isRead = true
        }
      }
      return convoCopy;
    } else {
      return convo;
    }
  }); 
}