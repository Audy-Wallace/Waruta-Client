import "./App.css"
import NavBar from "./components/NavBar"
import { Route, Routes} from 'react-router-dom';
import Singleplayer from './views/singleplayer';
function App() {
  return (
    <div id="root" className="bg-repeat min-h-screen bg-gradient-to-br from-[#c236e2] to-[#5719dc]">
      <Routes>
        <NavBar/>
        <Route path="/singleplayer" element={<Singleplayer/>}/>
      </Routes>
    </div>
  )
}

export default App
