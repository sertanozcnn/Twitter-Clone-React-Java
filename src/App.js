import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Eklenen importlar
import HomePage from './pages/HomePage/HomePage';
import Authentication from './pages/Authentication/Authentication';
import Message from './pages/Message/Message';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div className="">

      <Routes>
       
        <Route path="/home" element={<HomePage />} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>



    </div>
  );
}

export default App;
