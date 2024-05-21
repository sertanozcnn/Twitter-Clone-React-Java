import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import React, { useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction } from '../../Redux/Post/post.action';
import { useFormik } from 'formik';


const PostCard = ({ item }) => {

  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleShowComment = () => setShowComments(!showComments);

  const { auth } = useSelector(store => store);


  const handleCreateComment = async (content) => {
    setLoading(true);

    const reqData = {
      postId: item.id,
      data: {
        content
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    await dispatch(createCommentAction(reqData));
    setLoading(false);
  }




  if (!item || !item.user) {
    return <div className='text-gray-100' >Error: User information not found</div>;
  }

  return (
    <Card className='post-card-content' style={{ backgroundColor: "#211b44" }}>

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

          <IconButton onClick={handleShowComment}>
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


      {showComments && <section>
        <div className=' items-center'>

          <div className=' ml-2 mr-2'>
            <Divider className='opacity-50' style={{ backgroundColor: '#d7dae0' }} />
          </div>



          <div className='flex items-center space-x-3 mx-3 my-5' >
            <Avatar sx={{ bgcolor: auth?.user.randomProfileColorCode }} aria-label="recipe">
              <span >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
            </Avatar>



            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  console.log("Enter Pressed ----", e.target.value)
                }
              }}
              type='text'
              class="
                  mr-4
                  text-lg
                  peer 
                  h-full w-[90%]
                  text-gray-200
                  bg-transparent  pt-2
                  px-1
                  pb-1.5 font-normal 
                  outline outline-0 
                  transition-all placeholder-shown:border-blue-gray-200 
                  focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 bg-purple"
              placeholder='Post your reply'

            />

            <Button
           

              class="
                                        
                                    bg-gray-800 hover:bg-gray-900 focus:outline-none 
                                    font-kanit rounded-full text-sm px-5 
                                    py-2.5  dark:bg-gray-100 dark:hover:bg-gray-600 
                                    dark:border-gray-700 dark:hover:text-gray-100"
              type='submit'>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Reply"
              )}

            </Button>

          </div>


          <div className='ml-2 mr-2'>
            <Divider className='opacity-50' style={{ backgroundColor: '#d7dae0' }} />
          </div>

          { item.comments.map((comment)=>   <div className=' space-y-3 my-5 text-xs'>

            <div className='mx-3 justify-between items-center ' >

                
              <div className='flex items-center space-x-2'>

                <Avatar sx={{ height: "2rem", width: "2rem", bgcolor: item.user.randomProfileColorCode }} aria-label="recipe">
                  <span className='text-sm'>{comment.user.firstName.charAt(0).toUpperCase()}</span>
                </Avatar>

                <p className='font-kanit text-gray-50 text-base'>{comment.user.firstName + " " + comment.user.lastName}</p>

                <p className='opacity-70 font-kanit-regular text-sm text-gray-200'>

                  @{comment.user.nickname || comment.user.firstName.toLowerCase() + "_" + comment.user.lastName.toLowerCase()}

                </p>

              </div>

              <p className='text-gray-50 text-base mx-10 break-all ' >{comment.content} </p>


            </div>

            <div className='ml-2 mr-2'>
              <Divider className='opacity-50' style={{ backgroundColor: '#d7dae0' }} />
            </div>



          </div>)}


        </div>




      </section>}


      {/* <input
              onClick={handleOpenCreatePostModal}
              type='text'
              placeholder="What's going on?"
              class="
              mr-4
              text-lg
              peer 
            h-full w-[90%]
            text-gray-200
            bg-transparent  pt-2
            px-5 
            pb-1.5 font-normal 
             outline outline-0 
            transition-all placeholder-shown:border-blue-gray-200 
            focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 bg-purple" /> */}


    </Card>
  )
}

export default PostCard
