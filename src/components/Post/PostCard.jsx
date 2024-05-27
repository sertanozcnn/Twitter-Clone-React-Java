import { Alert, Avatar, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, deleteUserPostAction, getLikedPostAction, getSavedPostAction, likePostAction, savePostAction, unlikePostAction, unsavedPostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikeByReqUser';
import { isSavedByReqUser } from '../../utils/isSavedByReqUser';
import { FaRegTrashCan } from 'react-icons/fa6';
import { GoAlert, GoCircleSlash } from 'react-icons/go';


const PostCard = ({ item }) => {

  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);




  const handleShowComment = () => setShowComments(!showComments);

  const { auth } = useSelector(store => store);
  const { likePostCount } = useSelector(state => state.post);
  const [anchorEl, setAnchorEl] = useState(null); 

  const open = Boolean(anchorEl);

  const [reportedPost, setReportedPost] = useState('');

  const [blockedUser, setBlockedUser] = useState('');


  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

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
      dispatch(getLikedPostAction(localStorage.getItem('jwt'), auth.user?.id));

    });
  }

  const handleUnlikePost = () => {
    dispatch(unlikePostAction(item.id)).then(() => {
      dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
      dispatch(getLikedPostAction(localStorage.getItem('jwt'), auth.user?.id));

    });
  }


  const handleSavedPost = () => {

    dispatch(savePostAction(item.id)).then(() => {
      dispatch(getLikedPostAction(localStorage.getItem('jwt'), auth.user?.id));

    });
  }

  const handleunSavedPost = () => {
    dispatch(unsavedPostAction(item.id)).then(() => {
      dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
      dispatch(getLikedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    });


  }

  const handleDeletePost = () => {
    dispatch(deleteUserPostAction(localStorage.getItem('jwt'), item.id)).then(() => {
      setSuccess('Post deleted successfully.'); // Post silindiğinde başarılı mesajı ayarla
      window.location.reload(); // Sayfayı yenile
    }).catch(() => {
      setError('Failed to delete post.'); // Post silme işlemi başarısız olduğunda hata mesajı ayarla
    });
  };


  const handleReportPost = () => {
    setReportedPost(true);
    setTimeout(() => setReportedPost(false), 3000);
  };

  const handleBlockUser = () => {
    setBlockedUser(true);
    setTimeout(() => setBlockedUser(false), 3000);
  };

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





  if (!item || !item.user) {
    return <div className='text-gray-100' >Error: User information not found</div>;
  }


  console.log("likePostCount", likePostCount);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className='post-card-content' style={{ backgroundColor: "#211b44" }}>

      <CardHeader
        avatar={
          <Avatar
            src={item.user.image || ''}
            sx={{ bgcolor: item.user.image ? "transparent" : item.user.randomProfileColorCode }} aria-label="recipe">

            <span >{item.user.firstName.charAt(0).toUpperCase()}</span>
          </Avatar>

        

      
        }
        action={
          <Button
            id="basic-button-post"
            aria-controls={open ? 'post-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <IoMdMore size={25} color='white' />

          </Button>
        }

        title={<p className='font-kanit text-gray-50 text-base'>{item.user.firstName + " " + item.user.lastName}</p>}
        subheader={<p className='opacity-70 font-kanit-regular text-sm text-gray-200'>

          @{item.user.nickname || item.user.firstName.toLowerCase() + "_" + item.user.lastName.toLowerCase()}

        </p>
        
      }
      />

      <CardContent>
        <Typography variant="body2" className='text-gray-100' fontSize={16} >
          {item.caption}
        </Typography>
  

      </CardContent>

   

      
      <Menu


        id="post-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-post',
        }}

        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#3a317e',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            }
          }
        }}

      >
        {auth.user.id === item.user.id && (
          <MenuItem onClick={handleDeletePost} >
            <ListItemIcon>
              <FaRegTrashCan style={{ color: '#ff5757' }} size={20} />
            </ListItemIcon>
            <span className='text-gray-100 font-kanit text-red-400'>Delete Post</span>
          </MenuItem>
        )}

        <MenuItem onClick={handleReportPost}>
          <ListItemIcon>
            <GoCircleSlash color='white' size={20} />

          </ListItemIcon>
          <span className='text-gray-100 font-kanit'>Report Post</span>

        </MenuItem>

        <MenuItem onClick={handleBlockUser} >
          <ListItemIcon>
            <GoAlert color='white' size={20} />

          </ListItemIcon>
          <span className='text-gray-100 font-kanit'>Block User</span>

        </MenuItem>

  

      </Menu>

      <div className='px-4 mb-2'>


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


      <div className='px-4 ' >
        <p className='text-gray-400 text-sm font-kanit' >{item.elapsedTime}</p>
      </div>

      <div className='mt-4 ml-2 mr-2'>
        <Divider style={{ backgroundColor: '#d7dae0' }} />
      </div>

      <CardActions className='flex justify-between' disableSpacing >
        <div className="flex items-center space-x-32 ">

          <IconButton onClick={handleShowComment} className="postcard-chat">
            <RiChat3Line className='chat-color transition-color  transform duration-200'


            />
          </IconButton>


          <IconButton onClick={isLiked ? handleUnlikePost : handleLikePost} className="postcard-heart ">
            {isLiked ? <MdFavorite color='#f91880' /> : <MdFavoriteBorder

              className='like-color transition-color  transform duration-200' />}
            <span className='text-sm text-gray-200 ml-1'>{item.liked.length}</span>
          </IconButton>



          <IconButton className="postcard-share"  >
            {true ? <IoShareOutline

              className='share-color transition-color  transform duration-200' /> : <IoBookmark color='#1d9bf0' />}


          </IconButton>

          <IconButton onClick={isSaved ? handleunSavedPost : handleSavedPost} className="postcard-chat"   >
            {isSaved ? <IoBookmark color='#1d9bf0' /> :

              <IoBookmarkOutline
                className='saved-color transition-color  transform duration-200' />}
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
      {reportedPost && (
        <div
          className="fixed bottom-4 left-0 right-0 flex justify-center"
        >
          <Alert variant="filled" severity="error" style={{ color: 'white' }}>
            Post has been reported successfully.
          </Alert>
        </div>
      )}

      {blockedUser && (
        <div
          className="fixed bottom-4 left-0 right-0 flex justify-center"
        >
          <Alert variant="filled" severity="warning" style={{ color: 'white' }}>
            User has been blocked successfully.
          </Alert>
        </div>
      )}

      {error && (
        <div
          className="fixed bottom-4 left-0 right-0 flex justify-center"
        >
          <Alert
            variant="filled"
            severity="error"
            style={{ color: 'white' }}
          >
            {error}
          </Alert>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <Alert variant="filled" severity="success" style={{ color: 'white' }}>
            {success}
          </Alert>
        </div>
      )}

    


    </Card>
  )
}

export default PostCard
