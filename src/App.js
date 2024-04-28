import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Eklenen importlar
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';


function App() {
  return (
    <div className="">

<Router>
        <Routes>
        <Route path="/*" element={<HomePage />} />
          <Route path="/message" element={<HomePage />} />
          <Route path="/*" element={<Authentication />} />
        </Routes>
      </Router>



    </div>
  );
}

export default App;
