import { Avatar } from '@mui/material'
import React from 'react'


const StoryCircle = ({ user, onClick }) => {



  return (
    <div>
      <div className='
       
       flex flex-col justify-center items-center ml-4 cursor-pointer
       p-1
       ring-2 
       ring-red-900 
       hover:ring-red-400  
       rounded-full
       hover:bg-gradient-to-r 
       hover:from-avatarColor-200 
       hover:via-avatarColor-100 
       hover:to-avatarColor-300
      transition-all 
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





      </div >

      <p className='font-kanit-regular text-gray-200 ml-6' >{user.firstName}..</p>


    </div >
  )
}

export default StoryCircle
