import './App.css';
import { Routes, Route } from 'react-router-dom'; // Eklenen importlar
import HomePage from './pages/HomePage/HomePage';
import Authentication from './pages/Authentication/Authentication';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';

function App() {

  const dispatch = useDispatch()
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    document.title = 'Mix';
    dispatch(getProfileAction(jwt))
  }, []);




  return (
    <div >

      <Routes>

        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>



    </div>
  );
}

export default App;
