import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
  return (
    <div>
       <div className='flex flex-col justify-center items-center ml-4 cursor-pointer'>
          <Avatar src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' sx={{ width: "3.5rem", height: "3.5rem" }} >

          </Avatar>
          <p className='font-kanit-regular text-gray-200' >code..</p>
        </div>
    </div>
  )
}

export default StoryCircle
