import './App.css';
import { Routes, Route } from "react-router-dom"
import LandingPage from './view/LandingPage';
import MultiPlayerPage from './view/MultiPlayerPage';
import MultiPlayerRoom from './view/MultiPlayerRoom';
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Singleplayer from "./views/singleplayer";
function App() {

  return (
    <div
      id="root"
      className="bg-repeat min-h-screen bg-gradient-to-br from-[#c236e2] to-[#5719dc]"
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route path='/multiplayer' element={<MultiPlayerPage ></MultiPlayerPage>}></Route>
      <Route path='/multiplayer/:roomId' element={<MultiPlayerRoom></MultiPlayerRoom>}></Route>
      </Routes>
    </div>
  );
}

export default App;
