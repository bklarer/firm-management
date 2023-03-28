import '../../App.css';
import {Routes, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { checkLogin, } from "../../slices/loginSlice";
import Navbar from './Navbar';
import LeftBar from './LeftBar';
import DynamicContainer from './DynamicContainer';
import TaskList from '../task/TaskList';
import Login from '../user/Login';
import SignUp from '../user/SignUp';
import NewTask from '../task/NewTask';
import EditTask from '../task/EditTask';
import Profile from '../user/Profile';
import EditProfile from '../user/EditProfile';
import NewProject from '../task/NewProject';
import EditProject from '../task/EditProject';
import { fetchUsers } from '../../slices/userSlice';
import { fetchTasks } from '../../slices/taskSlice';
import ContactList from '../user/ContactList';
import SideTasks from '../task/SideTasks';
import ProfileEdit from '../user/ProfileEdit';
import FullTaskView from '../task/FullTaskView';



const CenterContainer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadData = () => dispatch(fetchTasks()) 
        loadData()
      },[dispatch])

      useEffect(() => {
        const loadData = () => dispatch(fetchUsers()) 
        loadData()
      },[dispatch])

    return (


        <div className="center-container">
            <Routes>
                <Route path="/" element={<LeftBar/>}>
                  <Route index element={<ContactList/>}/>
                  <Route path="*" element={<ContactList/>}/>
                  <Route path="profile">
                    <Route index element={<SideTasks/>}/>
                    <Route path="*" element={<SideTasks/>}/>
                  </Route>
                </Route>
            </Routes>
            
            <Routes>
                <Route path="/" element={<DynamicContainer/>}>
                  <Route index element={<TaskList/>}/>
                  <Route path="*" element={<TaskList/>}/>
                  <Route path="new" element={<NewTask/>}/>
                  <Route path=":taskId">
                    <Route index element={<FullTaskView/>}/>
                    <Route path="edit" element={<EditTask/>}/>
                  </Route>
                  <Route path="profile" >
                    <Route index element={<Profile/>}/>
                    <Route path="edit" element={<ProfileEdit/>}/>
                  </Route>
                </Route>
            </Routes>
        </div>


    )


}

export default CenterContainer