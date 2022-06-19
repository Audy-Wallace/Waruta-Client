import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Singleplayer from "./views/singleplayer";
import Home from "./views/home";

function App() {
  return (
    <div
      id="root"
      className="bg-repeat min-h-screen bg-gradient-to-br from-[#c236e2] to-[#5719dc]"
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
      </Routes>
    </div>
  );
}

export default App;
