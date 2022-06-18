import { Route, Routes } from "react-router-dom"
import "./App.css"
import NavBar from "./components/NavBar"

function App() {
  return (
    <div id="root" className="bg-repeat min-h-screen bg-gradient-to-tl from-[#B689C0] to-[#6A67CE]">
      <NavBar />
      <Routes></Routes>
    </div>
  )
}

export default App
