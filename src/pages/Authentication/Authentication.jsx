import { Grid, Card } from '@mui/material';
import React from 'react';
import Login from '../Authentication/Login'
import Register from '../Authentication/Register'
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
  return (
    <div className='mx-auto'>
      <div className='bg-purple min-h-screen w-90'>
        <Grid container>
          <Grid item xs={7} className='h-screen overflow-hidden flex justify-center items-center'>
            <img className='size-1/4' src="https://r.resimlink.com/gqN9f.png" alt="" />
          </Grid>
          <Grid item xs={5}>
            <div className='px-20 flex flex-col justify-center h-full'>
              <Card className='card p-6' style={{ backgroundColor: '#7169eb', borderRadius: '20px' }} >
                <div className='flex flex-col items-center mb-8 space-y-1'>
                  <h1 className='font-bold logo text-center text-3xl dark:text-white text-gray-900 mb-4' style={{ color: 'white' }}>Social Mix</h1>
                  <p className='text-center text-1xl font-semibold' style={{ color: 'white' }}>Make every moment full of knowledge!</p>
                </div>
                <div>

                  <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                  </Routes>


                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Authentication;
