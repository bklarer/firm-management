import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import usersReducer from "./slices/userSlice"

const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer
    },
});


export default store;