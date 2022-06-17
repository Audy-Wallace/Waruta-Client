import { Route, Routes} from 'react-router-dom';
import Singleplayer from './views/singleplayer';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/singleplayer" element={<Singleplayer/>}/>
      </Routes>
    </div>
  );
}

export default App;
