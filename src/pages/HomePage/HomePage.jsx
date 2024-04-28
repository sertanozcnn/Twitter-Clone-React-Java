import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation(); 

  return (
    <div>
      <div className='px-20'>
        <Grid container spacing={0}>
          <Grid item xs={0} lg={3}>

            <div className='stick top-0'>
              <Sidebar />
            </div>

          </Grid>

          <Grid lg={location.pathname === "/" ? 6 : 9} item className='px-5 flex justify-center' xs={12}> 
          
          </Grid>

        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
