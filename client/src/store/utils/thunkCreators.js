import axios from "axios";
import store from "..";
import socket from "../../socket";
import { setActiveChat } from "../activeConversation";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    await localStorage.removeItem("messenger-token");
    dispatch(gotUser({}));
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = (body) => {
  const data = axios.post("/api/messages", body)
  return data;
};

const sendMessage = (data, body) => {
  socket.emit("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const {data} = await saveMessage(body)
    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }
    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const readMessages = (data) =>{
  return axios.patch("/api/messages/read",data)
}

export const informUserMessageRead = (message)=>{
  socket.emit("read-message", {
    messageId: message.id,
    conversationId: message.conversationId
  });
}

export const setAscActiveChat = (conversation, unreadCount) => async (dispatch) => {
    try{
      if(unreadCount > 0){
        //read message
        readMessages({conversationId:conversation.id, senderId:conversation.otherUser.id})
        //inform user read meessage
        informUserMessageRead({id:-1,conversationId:conversation.id})
      }
      //dispatch
      dispatch(setActiveChat(conversation.otherUser.username, conversation.id))
    }catch (error){
      console.error(error)
    }
}

export const acceptNewMessage = (data) => async (dispatch) => {
  try{
    const activedConversationId = store.getState().activeConversation.conversationId
    if(activedConversationId === data.message.conversationId){
      data.message.isRead = true;
      //update message status in server
      readMessages({messageId:data.message.id})
      informUserMessageRead(data.message)
    }
    dispatch(setNewMessage(data.message, data.sender))
  }catch (error){
    console.error(error)
  }
}
