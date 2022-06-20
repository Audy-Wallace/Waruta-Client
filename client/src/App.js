import { Route, Routes } from "react-router-dom"
import SignupPage from "./views/RegisterPage"
import LoginPage from "./views/LoginPage"
import "./App.css"
import NavBar from "./components/NavBar"
import LandingPage from "./views/LandingPage"
import MultiPlayerPage from "./views/MultiPlayerPage"
import MultiPlayerRoom from "./views/MultiPlayerRoom"
import Singleplayer from "./views/singleplayer"
function App() {
  return (
    <div className="bg-repeat min-h-screen bg-gradient-to-br from-[#c236e2] to-[#5719dc]">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route path="/multiplayer" element={<MultiPlayerPage></MultiPlayerPage>}></Route>
        <Route path="/multiplayer/:roomId" element={<MultiPlayerRoom></MultiPlayerRoom>}></Route>
      </Routes>
    </div>
  )
}

export default App
