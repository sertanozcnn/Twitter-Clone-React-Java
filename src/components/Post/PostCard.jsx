import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import React from 'react'
import { IoMdMore } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";


const PostCard = ({ item }) => {

  if (!item || !item.user) {
    return <div>Error: User information not found</div>;
  }

  return (
    <Card className='' style={{ backgroundColor: "#211b44" }}>

      <CardHeader

        avatar={
          <Avatar sx={{ bgcolor: item.user.randomProfileColorCode }} aria-label="recipe">
            <span >{item.user.firstName.charAt(0).toUpperCase()}</span>
          </Avatar>

      // <Avatar sx={{ bgcolor: auth?.user.randomProfileColorCode }} aria-label="recipe">
      // <span >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
      // </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <IoMdMore color='white' />
          </IconButton>
        }
        title={<p className='font-kanit text-gray-50 text-base'>{item.user.firstName + " " + item.user.lastName}</p>}
        subheader={<p className='opacity-70 font-kanit-regular text-sm text-gray-200'>

          @{item.user.nickname || item.user.firstName.toLowerCase() + "_" + item.user.lastName.toLowerCase()}

        </p>}
      />

      <CardContent>
        <Typography variant="body2" className='text-gray-100' fontSize={16} >
          {item.caption}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />

      <div className='mt-4 ml-2 mr-2'>
        <Divider style={{ backgroundColor: '#d7dae0' }} />
      </div>

      <CardActions className='flex justify-between' disableSpacing >
        <div className="flex items-center space-x-32 ">

          <IconButton>
            {<RiChat3Line color='#b3bbc6' />}

          </IconButton>

          <IconButton >
            {true ? <MdFavoriteBorder color='#b3bbc6' /> : <MdFavorite color='#b3bbc6' />}

          </IconButton>



          <IconButton >
            {<IoShareOutline color='#b3bbc6' />}

          </IconButton>

          <IconButton  >
            {true ? <IoBookmarkOutline color='#b3bbc6' /> : <IoBookmark color='#b3bbc6' />}

          </IconButton>
        </div>




      </CardActions>



    </Card>
  )
}

export default PostCard
