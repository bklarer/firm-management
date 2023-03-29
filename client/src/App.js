import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "./slices/loginSlice";
import Navbar from "./features/structure/Navbar";
import LeftBar from "./features/structure/LeftBar";
import DynamicContainer from "./features/structure/DynamicContainer";
import Footer from "./features/structure/Footer";
import TaskList from "./features/task/TaskList";
import Login from "./features/user/Login";
import SignUp from "./features/user/SignUp";
import NewTask from "./features/task/NewTask";
import EditTask from "./features/task/EditTask";
import Profile from "./features/user/Profile";
import EditProfile from "./features/user/EditProfile";
import NewProject from "./features/task/NewProject";
import EditProject from "./features/task/EditProject";
import { fetchUsers } from "./slices/userSlice";
import { fetchTasks } from "./slices/taskSlice";
import ContactList from "./features/user/ContactList";
import ProfileEdit from "./features/user/ProfileEdit";
import FullTaskView from "./features/task/FullTaskView";
import Loading from "./features/structure/Loading";
import UserInfo from "./features/user/UserInfo";
import { fetchProjects } from "./slices/projectSlice";

//Update new forms to update state
//Create Edit form
//When clicking on contact, bring up contacts tasks
//Show All tasks, My tasks, and then the rest of the tasks.
//Create Modal for view and edit task buttons
//Bring down users and tasks separately nest tasks to users
//Automatically filter tasks when complete
//Show completed tasks
//Implement CSS ideas... light/dark mode, switch between card view and list view

//Remember to make conditionals for when arrays are 0

function App() {
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const taskLoading = useSelector((state) => state.login.loading);
  const userLoading = useSelector((state) => state.tasks.loading);
  const LoginLoading = useSelector((state) => state.users.loading);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchTasks());
      dispatch(fetchUsers());
      dispatch(fetchProjects())
    }
  }, [dispatch, userInfo]);

  return (
    <div className="App">
      {taskLoading || userLoading || LoginLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {!userInfo ? (
            <Routes>
              <Route path="/*" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>
          ) : (
            <div className="center-container">
              <Routes>
                <Route path="/" element={<LeftBar />}>
                  <Route index element={<ContactList />} />
                  <Route path="*" element={<ContactList />} />
                </Route>
              </Routes>

              <Routes>
                <Route path="/" element={<DynamicContainer />}>
                  <Route index element={<TaskList />} />
                  <Route path="*" element={<TaskList />} />
                  <Route path="new" element={<NewTask />} />
                  <Route path=":taskId">
                    <Route index element={<FullTaskView />} />
                    <Route path="edit" element={<EditTask />} />
                  </Route>
                  <Route path="user/:userId" element={<UserInfo/>}/>
                  <Route path="profile">
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<ProfileEdit />} />
                  </Route>
                </Route>
              </Routes>
            </div>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
