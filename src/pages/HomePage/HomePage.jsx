// HomePage.js

import { Route, Routes, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import MiddlePart from '../../components/MiddlePart/MiddlePart';
import Profile from '../Profile/Profile';
import HomeRight from '../../components/HomeRight/HomeRight';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getProfileAction } from '../../Redux/Auth/auth.action';
import Following from '../../components/Following/Following';
import Followers from '../../components/Following/Followers';

const HomePage = () => {

  const dispatch = useDispatch();

  const location = useLocation();

  const jwt = localStorage.getItem('jwt');




  useEffect(() => {
    document.title = 'Home';

    dispatch(getProfileAction(jwt))

  }, [dispatch, jwt]);


  return (
    <div className='px-40 bg-mainColor-500 grid-rows-3 grid-flow-col gap-4   '  >
      <Grid container spacing={0}  >

        <Grid item xs={12} lg={3} >

          <div className='sticky top-0 mx-2  ' >
            <Sidebar />
          </div>
        </Grid>


        <Grid lg={location.pathname === "/" ? 6 : 9} xs={12} item className='flex justify-center ' >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/following" element={<Following />} />
            <Route path="/followers" element={<Followers />} />
          </Routes>
        </Grid>






        {location.pathname === "/" &&

          <Grid item xs={2} lg={0} className='' >
            <div className='sticky top-10 flex-nowrap w-[25rem] min-w-fit  '>
              <HomeRight />

            </div>

          </Grid>}

      </Grid>
    </div>
  );
};

export default HomePage;
