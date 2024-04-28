import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../../components/Sidebar';


const HomePage = () => {
  return (
    <div>
        <div className='px-20'>
          <Grid container spacing={0}>
            <Grid item xs={0} lg={3}> 

            <div className='stick top-0'>


              <Sidebar />

          

                

            </div>

            </Grid>

          </Grid>
        </div>
    </div>
  );
};

export default HomePage;
