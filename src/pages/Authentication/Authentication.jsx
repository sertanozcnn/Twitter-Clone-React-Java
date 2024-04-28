import { Grid, Card } from '@mui/material'; // Card bileşenini içe aktar
import React from 'react';

import Login from './Login';
import HomePage from '../HomePage/HomePage';

const Authentication = () => {
  return (
    <div className='mx-auto  '>
    <div  className='bg-purple min-h-screen w-90 '>
      
        <Grid container className=''>
          <Grid className='h-screen   overflow-hidden flex justify-center items-center 'item xs={7}>
            <img className='size-1/4  ' src="https://r.resimlink.com/gqN9f.png" alt="" />
          </Grid>
          <Grid item xs={5} className=''>

          <div className='px-20 flex flex-col justify-center h-full '>
            <Card className='card p-6 ' style={ {backgroundColor:'#7169eb',borderRadius:'20px'} } >

            <div className='flex flex-col items-center mb-8 space-y-1'>
               <h1 className='font-bold logo text-center text-3xl dark:text-white text-gray-900 mb-4'  style={{color:'white'}}>Social Mix</h1>
               <p className=' text-center text-1xl font-semibold' style={{color:'white'}}>Make every moment full of knowledge!</p>
            </div>

           

            <Login/>
          

            </Card>
          </div>


          </Grid>


        </Grid>
        </div>
    </div>
  )
}

export default Authentication
