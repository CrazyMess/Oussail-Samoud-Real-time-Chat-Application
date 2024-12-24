import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SET_SOCKET_CONNECTED,
  SET_ONLINE_USERS,
} from "./actionTypes";

const BASE_URL = "http://localhost:5001";

// Check auth
export const checkAuth = () => async (dispatch) => {
  dispatch({ type: CHECK_AUTH_REQUEST });
  try {
    const res = await axiosInstance.get("/auth/check");
    dispatch({ type: CHECK_AUTH_SUCCESS, payload: res.data });

    // Connect socket after auth
    dispatch(connectSocket(res.data._id));
  } catch (error) {
    dispatch({
      type: CHECK_AUTH_FAILURE,
      payload: error.response.data.message,
    });
    console.log("error in checkAuth action: ", error);
  }
};

// Signup
export const signup = (data) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    toast.success("Account created successfully!");

    // Connect socket after signup
    dispatch(connectSocket(res.data._id));
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

// Login
export const login = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axiosInstance.post("/auth/login", data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    toast.success("Logged in successfully!");

    // Connect socket after login
    dispatch(connectSocket(res.data._id));
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.post("/auth/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    toast.success("Logged out successfully!");

    // Disconnect socket after logout
    dispatch(disconnectSocket());
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

// Update profile
export const updateProfile = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    const updatedData = res.data.updatedUser;
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: updatedData });

    toast.success("Profile updated successfully!");
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

// handle socket connection
let socket;

// connect socket
export const connectSocket = (userId) => (dispatch) => {
   socket = io(BASE_URL, {
    query: { userId },
  });

  // Dispatch an action to indicate the socket connection status
  dispatch({ type: SET_SOCKET_CONNECTED, payload: true });

  // Handle online users
  socket.on("getOnlineUsers", (usersIds) => {
    dispatch({ type: SET_ONLINE_USERS, payload: usersIds });
  });
};

// disconnect socket
export const disconnectSocket = () => (dispatch) => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  // Dispatch an action to indicate the socket connection status
  dispatch({ type: SET_SOCKET_CONNECTED, payload: false });
};
