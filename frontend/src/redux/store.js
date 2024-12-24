import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import chatReducer from './reducers/chatReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
    
    
});

export default store;