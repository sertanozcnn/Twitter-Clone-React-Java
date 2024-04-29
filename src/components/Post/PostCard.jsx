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


const PostCard = () => {
  return (
    <Card className=''>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <IoMdMore />
          </IconButton>
        }
        title="John Doe"
        subheader="@johndoe"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Very Beatiful İmage.
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="194"
        image="https://images.pexels.com/photos/21974391/pexels-photo-21974391/free-photo-of-urun-fotografciligi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt="Paella dish"
      />

      <div className='mt-4 ml-2 mr-2'>
        <Divider />
      </div>

      <CardActions className='flex justify-between' disableSpacing >
        <div className="flex items-center space-x-32 ">

          <IconButton>
            {<RiChat3Line />}

          </IconButton>

          <IconButton>
            {true ? <MdFavoriteBorder /> : <MdFavorite />}

          </IconButton>



          <IconButton >
            {<IoShareOutline />}

          </IconButton>

          <IconButton  >
            {true ? <IoBookmarkOutline /> : <IoBookmark />}

          </IconButton>
        </div>




      </CardActions>
     


    </Card>
  )
}

export default PostCard
