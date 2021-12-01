import axios from "axios";
import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    const activedConversationId = store.getState().activeConversation.conversationId
    if(activedConversationId === data.message.conversationId){
      data.message.isRead = true;
      //update message status in server
      axios.post("/api/messages/read",{messageId:data.message.id})
    }
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
