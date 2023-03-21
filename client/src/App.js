import './App.css';
import {Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { checkLogin, } from "./slices/loginSlice";
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
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch()
  
  useEffect(() => {
    const loadData = () => dispatch(checkLogin()) 
    loadData()
  },[dispatch])

  if(!userInfo) {
    return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      <Footer/>
    </div>
    )
  }




  
  return (
    <div className="App">
      
      <Navbar/>
      <Routes>
        <Route path="/">
          <Route index element={<CenterContainer/>} />
          <Route path="tasks"> 
            <Route path="new" element={<NewTask/>}   />
            <Route path="edit" element={<EditTask/>}  />
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
