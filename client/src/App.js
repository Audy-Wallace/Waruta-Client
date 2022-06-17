import logo from "./logo.svg"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className={"text-rose-400"}>
          Edit <code className={"text-emerald-400"}>src/App.js</code> and save to reload.
        </p>
        <a
          className={"text-sky-500"}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
