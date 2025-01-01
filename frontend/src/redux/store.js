import { configureStore} from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import chatReducer from './reducers/chatReducer';
import friendReducer from "./reducers/friendReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        friends: friendReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    
});

export default store;