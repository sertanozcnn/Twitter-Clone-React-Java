import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage/HomePage';
import Authentication from './pages/Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    document.title = 'Mix';
    dispatch(getProfileAction(jwt))
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/*" element={user ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
