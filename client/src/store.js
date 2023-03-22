import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import usersReducer from "./slices/userSlice"
import tasksReducer from "./slices/taskSlice"

const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        tasks: tasksReducer
    },
});


export default store;