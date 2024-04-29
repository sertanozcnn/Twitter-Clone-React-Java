import { Avatar, Card, IconButton } from '@mui/material';
import React from 'react'
import { IoIosAdd } from "react-icons/io";
import StoryCircle from './StoryCircle';
import { IoImageOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { PiArticle } from "react-icons/pi";
import PostCard from '../Post/PostCard';


const story = [11, 1, 1, 1, 1,1];
const posts = [1,1,1,1,1];

const MiddlePart = () => {

  const handleOpenCreatePostModal = () => {
      console.log("Open Create Post Modal");
  }

  return (
    <div className='px-20'>
      <section className='flex items-center p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{ width: "3.5rem", height: "3.5rem" }} >

            <IoIosAdd size={30} />
          </Avatar>
          <p>New</p>
        </div>

        {story.map((item) => <StoryCircle />)}

      </section>

      <section>
        <Card className='p-5 mt-5'>
          <div className='flex justify-between'>

            <Avatar className=''/>
            <input type='text' className='
            outline-none w-[90%] bg-slate-100 rounded-md px-5 
            bg-transparent border-[#3b4054] border ms-4'/>
          </div>

          <div className='flex justify-center space-x-9 mt-5'>


            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <IoImageOutline/>
              </IconButton>
              <span>Media</span>
              
            </div>

             
            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <IoVideocamOutline/>
              </IconButton>
              <span>Video</span>
            </div>

             
            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <PiArticle/>
              </IconButton>
              <span>Write</span>
            </div>

          </div>


        </Card>
        <div className='mt-5 space-y-5'>
          {posts.map((item)=> <PostCard/>)}
         
         
        </div>

      </section>





    </div>
  )
}

export default MiddlePart;
