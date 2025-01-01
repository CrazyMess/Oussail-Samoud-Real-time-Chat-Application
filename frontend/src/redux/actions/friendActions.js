import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAILURE,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILURE,
  REMOVE_FRIEND_REQUEST,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAILURE,
  ACCEPT_FRIEND_REQUEST,
  ACCEPT_FRIEND_SUCCESS,
  ACCEPT_FRIEND_FAILURE,
  REJECT_FRIEND_REQUEST,
  REJECT_FRIEND_SUCCESS,
  REJECT_FRIEND_FAILURE,
  GET_PENDING_REQUESTS_REQUEST,
  GET_PENDING_REQUESTS_SUCCESS,
  GET_PENDING_REQUESTS_FAILURE,
} from "./actionTypes";

// Fetch all friends
export const getFriends = () => async (dispatch) => {
  dispatch({ type: GET_FRIENDS_REQUEST });
  try {
    const res = await axiosInstance.get("/friends");
    dispatch({ type: GET_FRIENDS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_FRIENDS_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// Send friend request
export const sendFriendRequest = (id) => async (dispatch) => {
  dispatch({ type: ADD_FRIEND_REQUEST });
  try {
    await axiosInstance.post(`/friends/sendRequest/${id}`);
    dispatch({ type: ADD_FRIEND_SUCCESS });

    toast.success("Friend request sent successfully!");
  } catch (error) {
    dispatch({
      type: ADD_FRIEND_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// get all friend requests
export const getRequests = () => async (dispatch) => {
  dispatch({ type: GET_REQUESTS_REQUEST });
  try {
    const res = await axiosInstance.get("/friends/getRequests");
    dispatch({ type: GET_REQUESTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_REQUESTS_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// get all pending friend requests
export const getPendingRequests = () => async (dispatch) => {
  dispatch({ type: GET_PENDING_REQUESTS_REQUEST });
  try {
    const res = await axiosInstance.get("/friends/getPendingRequests");
    dispatch({ type: GET_PENDING_REQUESTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_PENDING_REQUESTS_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// Accept friend request
export const acceptFriendRequest = (friendId) => async (dispatch) => {
  dispatch({ type: ACCEPT_FRIEND_REQUEST });
  try {
    await axiosInstance.post(`/friends/acceptRequest`,{ friendId });
    dispatch({ type: ACCEPT_FRIEND_SUCCESS });

    toast.success("Friend request accepted successfully");
  } catch (error) {
    dispatch({
      type: ACCEPT_FRIEND_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// Reject friend request
export const rejectFriendRequest = (friendId) => async (dispatch) => {
  dispatch({ type: REJECT_FRIEND_REQUEST });
  try {


    await axiosInstance.post(`/friends/rejectRequest`, { friendId });
    dispatch({ type: REJECT_FRIEND_SUCCESS });

    toast.success("Friend request rejected successfully");
  } catch (error) {
    dispatch({
      type: REJECT_FRIEND_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// Remove friend
export const removeFriend = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FRIEND_REQUEST });
  try {
    await axiosInstance.delete(`/friends/deleteFriend/${id}`);
    dispatch({ type: REMOVE_FRIEND_SUCCESS });

    toast.success("Friend removed successfully");
  } catch (error) {
    dispatch({
      type: REMOVE_FRIEND_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
