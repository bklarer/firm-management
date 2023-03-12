import './App.css';
import Navbar from './features/structure/Navbar';
import CenterContainer from './features/structure/CenterContainer';
import LeftBar from './features/structure/LeftBar';
import DynamicContainer from './features/structure/DynamicContainer';
import Footer from './features/structure/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <CenterContainer>
        <LeftBar/>
        <DynamicContainer/>
      </CenterContainer>
      <Footer/>
    </div>
  );
}

export default App;
