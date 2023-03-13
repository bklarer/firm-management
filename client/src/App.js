import './App.css';
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
      <SignUp/>
      <EditProfile/>
      <NewTask/>
      <EditTask/>
      <NewProject/>
      <EditProject/>
      <Profile/>
      <CenterContainer>
        <LeftBar/>
        <DynamicContainer>
          <TaskList/>
        </DynamicContainer>
      </CenterContainer>
      <Footer/>
    </div>
  );
}

export default App;
