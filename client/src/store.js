import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import usersReducer from "./slices/userSlice"
import tasksReducer from "./slices/taskSlice"
import projectsReducer from "./slices/projectSlice"

const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        tasks: tasksReducer,
     projects: projectsReducer,
    },
});


export default store;