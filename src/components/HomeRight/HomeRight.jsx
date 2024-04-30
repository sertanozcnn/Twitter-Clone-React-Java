import React from 'react'
import PopularUserCard from './PopularUserCard'

import SearchUser from '../SearchUser/SearchUser';
import { Card } from '@mui/material';

const popularUser = [1, 1, 1, 1]

const HomeRight = () => {
  return (
    <div className='pr-5'>
      <SearchUser />

      <Card className='p-5' style={{ backgroundColor: "#211b44" }}>
        <div className='flex justify-between py-5 items-center'>
          <p className='font-kanit text-gray-100 '>Suggestions for you</p>
          <a href="www.google.com.tr" class="text-sm font-kanit text-blue-500">View All</a>

        </div>

        <div className='space-y-2'>
          {popularUser.map((item)=><PopularUserCard />)}
        </div>
      </Card>





    </div>
  )
}

export default HomeRight
