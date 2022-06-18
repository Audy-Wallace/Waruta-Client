import './App.css';
import { Routes, Route } from "react-router-dom"
import LandingPage from './view/LandingPage';
import MultiPlayerPage from './view/MultiPlayerPage';
import MultiPlayerRoom from './view/MultiPlayerRoom';


function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage></LandingPage>}></Route>
      <Route path='/multiplayer' element={<MultiPlayerPage ></MultiPlayerPage>}></Route>
      <Route path='/multiplayer/:roomId' element={<MultiPlayerRoom></MultiPlayerRoom>}></Route>
    </Routes>
    
  );
}

export default App;
