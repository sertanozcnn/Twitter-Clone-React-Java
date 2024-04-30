import { Avatar, Button, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
const PopularUserCard = () => {
  return (
    <div>
        <CardHeader
        avatar={
            <Avatar sx={{bgcolor: red[500]}} aria-label='recipe'>
                R
            </Avatar>
        }
        action={
            <Button  class="bg-gray-100 hover:bg-gray-600 hover:text-gray-100 font-kanit text-sm py-1 px-3 rounded-full mt-2">
                Follow
            </Button>
        }
        title={<p className='font-kanit text-gray-50 text-base'>John Doe</p>}
        subheader={<p className='opacity-70 font-kanit-regular text-sm text-gray-200'>@johndoe</p>}
      />
      
    </div>
  )
}

export default PopularUserCard
