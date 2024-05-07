import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Eklenen importlar
import HomePage from './pages/HomePage/HomePage';
import Authentication from './pages/Authentication/Authentication';
import Message from './pages/Message/Message';
import Profile from './pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';

function App() {
  
  const dispatch = useDispatch()
  const {auth} = useSelector(store=>store);
  const jwt = localStorage.getItem('jwt');

  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[])




  return (
    <div className="">

      <Routes>
       
        <Route path="/*" element={auth.user?<HomePage />:<Authentication/>} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>



    </div>
  );
}

export default App;
