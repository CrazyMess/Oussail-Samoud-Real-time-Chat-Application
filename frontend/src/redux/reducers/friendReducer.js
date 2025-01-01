import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAILURE,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILURE,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  ACCEPT_FRIEND_REQUEST,
  ACCEPT_FRIEND_SUCCESS,
  ACCEPT_FRIEND_FAILURE,
  REJECT_FRIEND_REQUEST,
  REJECT_FRIEND_SUCCESS,
  REJECT_FRIEND_FAILURE,
  REMOVE_FRIEND_REQUEST,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAILURE,
  GET_PENDING_REQUESTS_REQUEST,
  GET_PENDING_REQUESTS_SUCCESS,
  GET_PENDING_REQUESTS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  friendsList: [],
  requestList: [],
  pendingList: [],
  isFriendsLoading: false,
  isRequestsLoading: false,
  isAddingLoading: false,
  isAcceptingLoading: false,
  isRejectingLoading: false,
  isRemovingLoading: false,
  error: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return { ...state, isFriendsLoading: true, error: null };
    case GET_FRIENDS_SUCCESS:
      return { ...state, isFriendsLoading: false, friendsList: action.payload };
    case GET_FRIENDS_FAILURE:
      return { ...state, isFriendsLoading: false, error: action.payload };

    case GET_REQUESTS_REQUEST:
      return { ...state, isRequestsLoading: true, error: null };
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        isRequestsLoading: false,
        requestList: action.payload,
      };
    case GET_REQUESTS_FAILURE:
      return { ...state, isRequestsLoading: false, error: action.payload };

    case GET_PENDING_REQUESTS_REQUEST:
      return { ...state, isRequestsLoading: true, error: null };
    case GET_PENDING_REQUESTS_SUCCESS:
      return {
        ...state,
        isRequestsLoading: false,
        pendingList: action.payload,
      };
    case GET_PENDING_REQUESTS_FAILURE:
      return { ...state, isRequestsLoading: false, error: action.payload };

    case ADD_FRIEND_REQUEST:
      return { ...state, isAddingLoading: true, error: null };
    case ADD_FRIEND_SUCCESS:
      return { ...state, isAddingLoading: false };
    case ADD_FRIEND_FAILURE:
      return { ...state, isAddingLoading: false, error: action.payload };

    case ACCEPT_FRIEND_REQUEST:
      return { ...state, isAcceptingLoading: true, error: null };
    case ACCEPT_FRIEND_SUCCESS:
      return { ...state, isAcceptingLoading: false };
    case ACCEPT_FRIEND_FAILURE:
      return { ...state, isAcceptingLoading: false, error: action.payload };

    case REJECT_FRIEND_REQUEST:
      return { ...state, isRejectingLoading: true, error: null };
    case REJECT_FRIEND_SUCCESS:
      return { ...state, isRejectingLoading: false };
    case REJECT_FRIEND_FAILURE:
      return { ...state, isRejectingLoading: false, error: action.payload };

    case REMOVE_FRIEND_REQUEST:
      return { ...state, isRemovingLoading: true, error: null };
    case REMOVE_FRIEND_SUCCESS:
      return { ...state, isRemovingLoading: false };
    case REMOVE_FRIEND_FAILURE:
      return { ...state, isRemovingLoading: false, error: action.payload };
      
    default:
      return state;
  }
};

export default friendReducer;
