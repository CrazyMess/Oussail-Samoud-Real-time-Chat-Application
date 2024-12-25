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
  SET_SOCKET,
  SET_ONLINE_USERS, 
} from "../actions/actionTypes";

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isConnected: false,
  socket: null,
  onlineUsers: [],
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SIGNUP_REQUEST:
      return { ...state, isSigningUp: true, error: null };
    case SIGNUP_SUCCESS:
      return { ...state, isSigningUp: false, authUser: action.payload };
    case SIGNUP_FAILURE:
      return { ...state, isSigningUp: false, error: action.payload };
    
    case LOGIN_REQUEST:
      return { ...state, isLoggingIn: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoggingIn: false, authUser: action.payload };
    case LOGIN_FAILURE:
      return { ...state, isLoggingIn: false, error: action.payload };
    
    case LOGOUT_SUCCESS:
      return { ...state, authUser: null, socket: null, onlineUsers: [] };
    case LOGOUT_FAILURE:
      return { ...state, error: action.payload };
    
    case CHECK_AUTH_REQUEST:
      return { ...state, isCheckingAuth: true, error: null };
    case CHECK_AUTH_SUCCESS:
      return { ...state, isCheckingAuth: false, authUser: action.payload };
    case CHECK_AUTH_FAILURE:
      return { ...state, isCheckingAuth: false, error: action.payload };

    case UPDATE_PROFILE_REQUEST:
      return { ...state, isUpdatingProfile: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, isUpdatingProfile: false, authUser: action.payload };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, isUpdatingProfile: false, error: action.payload };
    
    case SET_SOCKET:
      return { ...state, isConnected: action.payload };

    case SET_ONLINE_USERS:
      return { ...state, onlineUsers:action.payload };

    default:
        return state;
  }
};

export default authReducer;
