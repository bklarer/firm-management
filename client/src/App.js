import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginError } from "./slices/loginSlice";
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
import NewProject from "./features/project/NewProject";
import EditProject from "./features/project/EditProject";
import { fetchUsers, clearUserError } from "./slices/userSlice";
import { fetchTasks, clearTaskError } from "./slices/taskSlice";
import ContactList from "./features/user/ContactList";
import ProfileEdit from "./features/user/ProfileEdit";
import FullTaskView from "./features/task/FullTaskView";
import Loading from "./features/structure/Loading";
import UserInfo from "./features/user/UserInfo";
import { fetchProjects, clearProjectError } from "./slices/projectSlice";
import ProjectList from "./features/project/ProjectList";
import ProjectView from "./features/project/ProjectView";
import MainProjectPage from "./features/project/MainProjectPage";
import Error from "./features/structure/Error";
import {
  fetchAssignments,
  clearAssignmentError,
} from "./slices/assignmentSlice";

function App() {
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const taskLoading = useSelector((state) => state.login.loading);
  const userLoading = useSelector((state) => state.tasks.loading);
  const loginLoading = useSelector((state) => state.users.loading);
  const projectLoading = useSelector((state) => state.projects.loading);
  const assignmentLoading = useSelector((state) => state.assignments.loading);
  const taskError = useSelector((state) => state.tasks.error);
  const loginError = useSelector((state) => state.login.error);
  const userError = useSelector((state) => state.users.error);
  const projectError = useSelector((state) => state.projects.error);
  const assignmentError = useSelector((state) => state.assignments.error);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchTasks());
      dispatch(fetchUsers());
      dispatch(fetchProjects());
      dispatch(fetchAssignments());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (
      taskError ||
      userError ||
      projectError ||
      assignmentError ||
      loginError
    ) {
      const interval = setTimeout(() => {
        dispatch(clearTaskError());
        dispatch(clearUserError());
        dispatch(clearProjectError());
        dispatch(clearAssignmentError());
        dispatch(clearLoginError());
      }, 5000);

      return () => clearTimeout(interval);
    }
  }, [
    dispatch,
    taskError,
    userError,
    projectError,
    assignmentError,
    loginError,
  ]);

  return (
    <div className="App">
      {taskLoading ||
      userLoading ||
      loginLoading ||
      projectLoading ||
      assignmentLoading ? (
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
                  <Route path="projects/*" element={<ProjectList />} />
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
                  <Route path="projects">
                    <Route index element={<MainProjectPage />} />
                    <Route path="new" element={<NewProject />} />
                    <Route path=":projectId" element={<ProjectView />} />
                    <Route path=":projectId/edit" element={<EditProject />} />
                  </Route>
                  <Route path="user/:userId" element={<UserInfo />} />
                  <Route path="profile">
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<ProfileEdit />} />
                  </Route>
                </Route>
              </Routes>
            </div>
          )}
          <Error />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
