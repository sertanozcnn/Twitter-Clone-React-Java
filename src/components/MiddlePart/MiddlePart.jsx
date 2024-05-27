import { Avatar, Card, Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import StoryCircle from './StoryCircle';
import { IoImageOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import PostCard from '../Post/PostCard';
import { MdOutlineArticle } from "react-icons/md";
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';
import CreateReelsModal from '../CreateReels/CreateReelsModal';
import { getLastFiveUsersAction } from '../../Redux/Auth/auth.action';
import ViewReelsModal from '../CreateReels/ViewReelsModal';



const MiddlePart = () => {

  const dispatch = useDispatch();
  const { post } = useSelector(store => store);



  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [openCreateReelsModal, setOpenCreateReelsModal] = useState(false);
  const [openViewReelsModal, setOpenViewReelsModal] = useState(false);

  const { auth } = useSelector(store => store);
  console.log("Post Store", post);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleCloseCreateReelsModal = () => setOpenCreateReelsModal(false);
  const handleCloseViewReelsModal = () => setOpenViewReelsModal(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("Open Create Post Modal", openCreatePostModal);
  }

  const handleOpenCreateReelsModal = () => {
    setOpenCreateReelsModal(true);
    console.log("Open Create Reels Modal", openCreateReelsModal);
  }



  const handleOpenViewReelsModal = async (userId) => {
    setSelectedUserId(userId);
    console.log("Open View Reels Modal", openViewReelsModal);

    setOpenViewReelsModal(true);
  }


  useEffect(() => {
    document.title = 'Home';
    dispatch(getAllPostAction())
    dispatch(getLastFiveUsersAction(localStorage.getItem('jwt')));
  }, [post.newComment, dispatch])


  const userLastFive = auth.lastFiveUsers;

  console.log("user lastFive", userLastFive)




  return (
    <div className=''>

      <section className='flex items-center p-5 rounded-b-md  md:max-xl:mt-10'>
        <div className='flex flex-col items-center mr-2 cursor-pointer 
        
        
        '>
          <Avatar


            className='
          transition-all 
          before:absolute 
          before:bottom-0 
          before:left-0 
          before:top-0 before:z-0 
          before:h-full before:w-0 
          before:bg-middle-100 
          before:transition-all 
          before:duration-500 
          hover:bg-white 
          hover:shadow-red-500 
          hover:before:left-0 
          hover:before:w-full
          relative
          '
            sx={{ width: "3.5rem", height: "3.5rem", backgroundColor: "#44359e" }} >



            <IconButton onClick={handleOpenCreateReelsModal}>
              <IoIosAdd size={30} color='white' />
            </IconButton>
          </Avatar>
          <p className='font-kanit-regular text-gray-200' >New</p>
        </div>




        {userLastFive && userLastFive.length > 0 && userLastFive.map((user) =>

          <StoryCircle

            onClick={() => handleOpenViewReelsModal(user.id)} // userId değerini iletiyoruz
            key={user.id}
            user={user}

          />


        )}




      </section>

      <section>
        <Card className='p-4 mt-5 ' style={{ backgroundColor: "#211b44" }}>
          <div className='flex justify-between'>



            <Avatar
              src={auth?.user.image || ''}
              sx={{ bgcolor: auth?.user.image ? "transparent" : auth?.user.randomProfileColorCode }} aria-label="recipe">
              {!auth?.user.image && (
                <span className='text-xl' >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
              )}
            </Avatar>


            <input
              onClick={handleOpenCreatePostModal}
              type='text'
              placeholder="What's going on?"
              className="
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
            <Divider style={{ backgroundColor: '#d7dae0' }} />
          </div>

          <div className='flex justify-center space-x-10 mt-2'>
            <div className='flex items-center '>
              <IconButton
                color='primary' className='' onClick={handleOpenCreatePostModal}>
                <IoImageOutline className='middle-color transition-color  transform duration-200 ' />
              </IconButton>
              <span className='font-kanit-regular text-gray-300   ' >Media</span>

            </div>


            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <IoVideocamOutline className='middle-color transition-color  transform duration-200 ' />
              </IconButton>
              <span className='font-kanit-regular text-gray-300'>Video</span>
            </div>


            <div className='flex items-center'>
              <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                <MdOutlineArticle className='middle-color transition-color  transform duration-200 ' />
              </IconButton>
              <span className='font-kanit-regular text-gray-300'>Write</span>
            </div>

          </div>


        </Card>
        <div className='mt-5 space-y-5 mb-4 ' >
          {post.posts.map((item) => <PostCard item={item} />)}

        </div>
      </section>


      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal} />
      </div>


      <div>
        <CreateReelsModal handleClose={handleCloseCreateReelsModal} open={openCreateReelsModal} />
      </div>

      <div>
        <ViewReelsModal
          userId={selectedUserId}
          handleClose={handleCloseViewReelsModal}
          open={openViewReelsModal} />
      </div>
    </div>
  )
}

export default MiddlePart;
