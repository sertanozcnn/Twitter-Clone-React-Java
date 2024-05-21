import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { getLastFiveUsersAction } from '../../Redux/Auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';

const StoryCircle = ({ user, onClick }) => {



  return (
    <div>
      <div className='
       
       flex flex-col justify-center items-center ml-4 cursor-pointer
       ring-2 ring-red-900 hover:ring-red-400  rounded-full
        p-1
        hover:bg-gradient-to-r hover:from-grad-200 hover:via-grad-300 hover:to-grad-100
       '>
        <Avatar
          src={user.image || ''}

          onClick={() => onClick(user.id)}

          
          sx={{ 
            
            width: "3.5rem", height: "3.5rem", 
            bgcolor: user.image ? "transparent" : user.randomProfileColorCode 
            

            }} aria-label="recipe">

          {!user.image && (
            <span className='text-xl' >{user.firstName.charAt(0).toUpperCase()}</span>
          )}
          



        </Avatar>





      </div>

      <p className='font-kanit-regular text-gray-200 ml-6' >{user.firstName}..</p>


    </div>
  )
}

export default StoryCircle
