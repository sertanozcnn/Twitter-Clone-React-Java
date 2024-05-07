import { Avatar, Card, Divider, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import StoryCircle from './StoryCircle';
import { IoImageOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import PostCard from '../Post/PostCard';
import { MdOutlineArticle } from "react-icons/md";
import CreatePostModal from '../CreatePost/CreatePostModal';


const story = [11, 1, 1, 1, 1, 1];
const posts = [1, 1, 1, 1, 1];

const MiddlePart = () => {

  const [openCreatePostModal,setOpenCreatePostModal]=useState(false);

  const handleCloseCreatePostModal=() => setOpenCreatePostModal(false);

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("Open Create Post Modal",openCreatePostModal);
  }

  return (
    <div className='px-20'>
      <section className='flex items-center p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-2 cursor-pointer'>
          <Avatar sx={{ width: "3.5rem", height: "3.5rem", backgroundColor: "#44359e" }} >

            <IoIosAdd size={30} />
          </Avatar>
          <p className='font-kanit-regular text-gray-200' >New</p>
        </div>

        {story.map((item) => <StoryCircle />)}

      </section>

      <section ck>
        <Card className='p-4 mt-5 '  style={{backgroundColor:"#211b44"}}>
          <div className='flex justify-between'>

            <Avatar className='' />
         

            <input
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
            focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 bg-purple" />
          </div>

          <div className='mt-4 ml-2 mr-2'>
            <Divider style={{backgroundColor:'#d7dae0'}} />
          </div>

          <div className='flex justify-center space-x-10 mt-2'>


            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <IoImageOutline  style={{color:'#b3bbc6'}} />
              </IconButton>
              <span className='font-kanit-regular text-gray-300' >Media</span>

            </div>


            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <IoVideocamOutline  style={{color:'#b3bbc6'}} />
              </IconButton>
              <span className='font-kanit-regular text-gray-300'>Video</span>
            </div>


            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <MdOutlineArticle   style={{color:'#b3bbc6'}}/>
              </IconButton>
              <span className='font-kanit-regular text-gray-300'>Write</span>
            </div>

          </div>


        </Card>
        <div className='mt-5 space-y-5 mb-4' >
          {posts.map((item) => <PostCard />)}


        </div>

      </section>


      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal} />
      </div>





    </div>
  )
}

export default MiddlePart;
