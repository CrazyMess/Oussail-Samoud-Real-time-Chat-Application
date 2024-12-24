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
} from "../actions/actionTypes";

const initialState = {
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_USERS_REQUEST:
      return { ...state, isUsersLoading: true, error: null };
    case GET_USERS_SUCCESS:
      return { ...state, isUsersLoading: false, users: action.payload };
    case GET_USERS_FAILURE:
      return { ...state, isUsersLoading: false, error: action.payload };

    case GET_MESSAGES_REQUEST:
      return { ...state, isMessagesLoading: true, error: null };
    case GET_MESSAGES_SUCCESS:
      return { ...state, isMessagesLoading: false, messages: action.payload };
    case GET_MESSAGES_FAILURE:
      return { ...state, isMessagesLoading: false, error: action.payload };

    case SEND_MESSAGE_REQUEST:
      return { ...state, isSendingMessage: true, error: null };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isSendingMessage: false,
        messages: [...state.messages, action.payload],
      };
    case SEND_MESSAGE_FAILURE:
      return { ...state, isSendingMessage: false, error: action.payload };

    case SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload, messages: [] };

    case ADD_NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};

export default chatReducer;
