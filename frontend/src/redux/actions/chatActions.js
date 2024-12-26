import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../../lib/socket";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SET_SELECTED_USER,
  ADD_NEW_MESSAGE,
} from "./actionTypes";

// Fetch all users
export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const res = await axiosInstance.get("/messages/users");
    dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

// Fetch messages for selected user
export const getMessages = (userId) => async (dispatch) => {
  dispatch({ type: GET_MESSAGES_REQUEST });
  try {
    const res = await axiosInstance.get(`/messages/${userId}`);
    dispatch({ type: GET_MESSAGES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// Send message to selected user
export const sendMessage =
  (messageData, selectedUserId) => async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        messageData
      );
      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

// Subscribe to messages via socket
export const subscribeToMessages = () => (dispatch, getState) => {
  const { selectedUser } = getState().chat;
  const socket  = getSocket();

  if (!selectedUser || !socket) return;

  socket.on("newMessage", (newMessage) => {
    const isMessageSendFromSelectedUser = newMessage.senderId === selectedUser._id;
    if (isMessageSendFromSelectedUser) {
      dispatch({ type: ADD_NEW_MESSAGE, payload: newMessage });
    }
  });
};

// Unsubscribe from messages via socket
export const unsubscribeFromMessages = () => () => {
  const socket  = getSocket();
  if (socket) {
    socket.off("newMessage");
  }
};

// Set Selected User
export const setSelectedUser = (user) => (dispatch) => {
  dispatch({ type: SET_SELECTED_USER, payload: user });
};
