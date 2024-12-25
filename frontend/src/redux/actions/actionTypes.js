///////////////////////////////////
// ----- AUTH ACTION TYPES ----- //
///////////////////////////////////

// signup action type
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// login action type
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// logout action type
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// check auth action type
export const CHECK_AUTH_REQUEST = "CHECK_AUTH_REQUEST";
export const CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS";
export const CHECK_AUTH_FAILURE = "CHECK_AUTH_FAILURE";

// update profile action type
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

// Socket action types
export const SET_SOCKET = "SET_SOCKET";
export const SET_ONLINE_USERS = "SET_ONLINE_USERS";

///////////////////////////////////
// ----- CHAT ACTION TYPES ----- //
///////////////////////////////////

// get users action types
export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

// get messages action types
export const GET_MESSAGES_REQUEST = "GET_MESSAGES_REQUEST";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";

// send message action types
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

// chat functions action types
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";