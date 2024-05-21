import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, getLikedPostCountAction, getSavedPostAction, likePostAction, savePostAction, unlikePostAction, unsavedPostAction } from '../../Redux/Post/post.action';
import { useFormik } from 'formik';
import { store } from '../../Redux/store';
import { isLikedByReqUser } from '../../utils/isLikeByReqUser';
import { isSavedByReqUser } from '../../utils/isSavedByReqUser';
import { getAllUsersAction } from '../../Redux/Auth/auth.action';


const PostCard = ({ item }) => {

  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { post } = useSelector(store => store)
  const [loading, setLoading] = React.useState(false);



  const handleShowComment = () => setShowComments(!showComments);

  const { auth } = useSelector(store => store);
  const { likePostCount } = useSelector(state => state.post);

  const [likeCounts, setLikeCounts] = useState({});

  //const { likedCount  } = useSelector(store => store.post);



  const handleCreateComment = async (content) => {
    setLoading(true);

    const reqData = {
      postId: item.id,
      data: {
        content
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(createCommentAction(reqData));
    setLoading(false);
  }




  const isLiked = isLikedByReqUser(auth.user.id, item);


  const isSaved = isSavedByReqUser(auth.user.id, item);

  const handleLikePost = () => {

    dispatch(likePostAction(item.id)).then(() => {
      dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    });
  }

  const handleUnlikePost = () => {
    dispatch(unlikePostAction(item.id)).then(() => {
      dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    });
  }


  const handleSavedPost = () => {
    dispatch(savePostAction(item.id));
  }

  const handleunSavedPost = () => {
    dispatch(unsavedPostAction(item.id)).then(() => {
      dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    });
  }



  //   const handleSaveClick = () => {
  //     if (isSaved) {
  //         // Kaldırma işlemi
  //         dispatch(unsavedPostAction(localStorage.getItem('jwt'), item.id));
  //     } else {
  //         // Ekleme işlemi
  //         dispatch(savePostAction(localStorage.getItem('jwt'), item.id));
  //     }
  // };




  console.log("is liked", isLikedByReqUser(auth.user.id, item))

  console.log("is saved", isSavedByReqUser(auth.user.id, item))

  useEffect(() => {
    if (item && item.id) {
      dispatch(getLikedPostCountAction(localStorage.getItem('jwt'), item.id));
      // Her post için like sayısını güncellemek için bir obje kullanıyoruz
      setLikeCounts(prevState => ({
        ...prevState,
        [item.id]: item.likePostCount
      }));
    }
  }, [dispatch, item]);



  if (!item || !item.user) {
    return <div className='text-gray-100' >Error: User information not found</div>;
  }


  console.log("likePostCount", likePostCount);



  return (
    <Card className='post-card-content' style={{ backgroundColor: "#211b44" }}>

      <CardHeader
        avatar={
          <Avatar
            src={item.user.image || ''}
            sx={{ bgcolor: item.user.image ? "transparent" : item.user.randomProfileColorCode }} aria-label="recipe">

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


      <div className='px-4'>


        {item.image ? (

          <img className="w-full rounded-lg max-h-[30rem] object-cover object-top" src={item.image} alt='' />
        ) : (item.video && (

          <video class="w-full rounded-lg "
            posterResizeMode="cover"
            resizeMode="cover"


            controls >
            <source src={item.video} type="video/mp4" />


          </video>
        ))}

      </div>



      <div className='mt-4 ml-2 mr-2'>
        <Divider style={{ backgroundColor: '#d7dae0' }} />
      </div>

      <CardActions className='flex justify-between' disableSpacing >
        <div className="flex items-center space-x-32 ">

          <IconButton onClick={handleShowComment} className="postcard-chat">
            <RiChat3Line color='#b3bbc6'


            />
          </IconButton>


          <IconButton onClick={isLiked ? handleUnlikePost : handleLikePost} className="postcard-heart">
            {isLiked ? <MdFavorite color='#f91880' /> : <MdFavoriteBorder color='#b3bbc6' />}
            <span className='text-sm text-gray-200 ml-1'>{item.liked.length}</span>
          </IconButton>



          <IconButton className="postcard-share"  >
            {true ? <IoShareOutline color='#b3bbc6' /> : <IoBookmark color='#1d9bf0' />}


          </IconButton>

          <IconButton onClick={isSaved ? handleunSavedPost : handleSavedPost} className="postcard-chat"   >
            {isSaved ? <IoBookmark color='#1d9bf0' /> : <IoBookmarkOutline color='#b3bbc6' />}
            <span className='text-sm text-gray-200 ml-1'>{item.savedByUsers.length}</span>


          </IconButton>
        </div>




      </CardActions>


      {showComments && <section>
        <div className=' items-center'>

          <div className=' ml-2 mr-2'>
            <Divider className='opacity-50' style={{ backgroundColor: '#d7dae0' }} />
          </div>



          <div className='flex items-center space-x-3 mx-3 my-5' >

            <Avatar
              src={auth?.user.image || ''}
              sx={{ bgcolor: auth?.user.image ? "transparent" : auth?.user.randomProfileColorCode }} aria-label="recipe">
              <span >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
            </Avatar>



            <form className='flex w-[90%] ' onSubmit={(e) => {
              e.preventDefault();
              const content = e.target.elements.content.value;
              handleCreateComment(content);
            }}>
              <input
                name="content"
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
                type='submit'
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Reply"
                )}
              </Button>
            </form>

          </div>


          <div className='ml-2 mr-2'>
            <Divider className='opacity-50' style={{ backgroundColor: '#d7dae0' }} />
          </div>

          {item.comments.slice(0).reverse().map((comment) => <div className=' space-y-3 my-5 text-xs'>

            <div className='mx-3 justify-between items-center ' >


              <div className='flex items-center space-x-2'>

                <Avatar
                  src={comment.user.image || ''}
                  sx={{ height: "2rem", width: "2rem", bgcolor: comment.user.image ? "transparent" : comment.user.randomProfileColorCode }} aria-label="recipe">
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
