import io from "socket.io-client";
import store from "./store";
import {
  removeOfflineUser,
  addOnlineUser,
  noticeReadMessage,
} from "./store/conversations";
import { acceptNewMessage } from "./store/utils/thunkCreators";

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
    store.dispatch(acceptNewMessage(data));
  });

  socket.on("read-message", (data) => {
    store.dispatch(noticeReadMessage(data.messageId, data.conversationId))
  });
});

export default socket;
