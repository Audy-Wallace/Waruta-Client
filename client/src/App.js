import './App.css';
import NavBar from "./components/NavBar";
import SignupPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom"
import LandingPage from './views/LandingPage';
import MultiPlayerPage from './views/MultiPlayerPage';
import MultiPlayerRoom from './views/MultiPlayerRoom';
import Singleplayer from "./views/SinglePlayer";
import { Helmet } from 'react-helmet';
function App() {
  return (
    <div
      id="root"
      className="bg-repeat min-h-screen bg-gradient-to-br from-[#c236e2] to-[#5719dc]"
    >
      <Helmet>
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-rJQkrPkvx8zujvzn"
        ></script>
      </Helmet>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route
          path="/multiplayer"
          element={<MultiPlayerPage></MultiPlayerPage>}
        ></Route>
        <Route
          path="/multiplayer/:roomId"
          element={<MultiPlayerRoom></MultiPlayerRoom>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
