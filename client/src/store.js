import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import usersReducer from "./slices/userSlice"
import tasksReducer from "./slices/taskSlice"
import projectsReducer from "./slices/projectSlice"
import assignmentReducer from "./slices/assignmentSlice"

const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        tasks: tasksReducer,
     projects: projectsReducer,
     assignments: assignmentReducer
    },
});


export default store;