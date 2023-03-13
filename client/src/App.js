import './App.css';
import {Routes, Route} from "react-router-dom"
import Navbar from './features/structure/Navbar';
import CenterContainer from './features/structure/CenterContainer';
import LeftBar from './features/structure/LeftBar';
import DynamicContainer from './features/structure/DynamicContainer';
import Footer from './features/structure/Footer';
import TaskList from './features/task/TaskList';
import Login from './features/user/Login';
import SignUp from './features/user/SignUp';
import NewTask from './features/task/NewTask';
import EditTask from './features/task/EditTask';
import Profile from './features/user/Profile';
import EditProfile from './features/user/EditProfile';
import NewProject from './features/task/NewProject';
import EditProject from './features/task/EditProject';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Login/>
      <Routes>
        <Route path="/">
          <Route index element={<CenterContainer/>} />
          <Route path="sign-up" element={<SignUp/>} />
          <Route path="tasks"> 
            <Route path="new" element={<NewTask/>}   />
            <Route path="edit" element={<EditTask/>}        />
          </Route>
        </Route>            
            <Route path="/projects/new" element={<NewProject/>} />
            <Route path="/projects/edit" element={<EditProject/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/edit" element={<EditProfile/>} />
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
