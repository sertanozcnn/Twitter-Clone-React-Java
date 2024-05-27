import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from '../Profile/ProfileModal';
import { getProfileAction, userFollowersCount, userFollowingsCount, userGetPostCount } from '../../Redux/Auth/auth.action';
import { getLikedPostAction, getSavedPostAction, getUsersPostAction } from '../../Redux/Post/post.action';
import { getAllReelsUsers } from '../../Redux/Reels/reels.action';

const tabs = [
  { value: "post", name: "Post", },
  { value: "reels", name: "Reels", },
  { value: "saved", name: "Saved", },
  { value: "liked", name: "Liked", },
]



const Profile = () => {


  const { auth, post, reels } = useSelector(store => store);
  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("post");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Profile';
    dispatch(getProfileAction(localStorage.getItem('jwt')));
    dispatch(userGetPostCount(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(userFollowingsCount(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(userFollowersCount(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getUsersPostAction(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getLikedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getAllReelsUsers(localStorage.getItem('jwt'), auth.user?.id));
  }, [dispatch, auth.user?.id]);

  //console.log("auth", auth);

  const userPosts = post.posts;
  const savedPosts = post.savedPosts;
  const postCount = auth.postCount;
  const followingsCount = auth.followingsCount;
  const followersCount = auth.followersCount;
  const userReels = reels.allReels;
  const likedPosts = post.likedPosts;




  //console.log("postCount", postCount);
  //console.log("savedPosts -----", savedPosts);
  //console.log("userreels -----", userReels);
  //console.log("likedPosts ----", likedPosts);


  return (
    <Card className=' w-4/5    md:max-xl:mt-10 min-h-lvh   ' style={{ backgroundColor: "#211b44", borderRadius: "0px" }} >
      <div className='rounded-md  '>
        <div className='p-2 pl-5'>



          <div className='flex items-start'  >
            <h1 className='font-kanit  text-gray-50 text-2xl font-bold  ' >{auth.user?.firstName + " " + auth.user?.lastName}</h1>
          </div>

          <div>

            <span className='text-gray-400 font-kanit' >
              <span className=''>{postCount}</span>
              <span > Post</span>
            </span>

          </div>
        </div>

        <div className='h-[15rem]' >
          <img
            className='w-full h-full  object-cover object-center 
                 transform    
                 transition-color   
                 duration-200 
                 hover:border-4
            
            '
            alt='User Background'
            src={auth?.user.backgroundImage || 'https://images.pexels.com/photos/8892/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}


          />

        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem] '>

          <Avatar
            withBorder={true}
            sx={{ width: "10rem", height: "10rem", bgcolor: auth?.user.image ? "transparent" : auth?.user.randomProfileColorCode }}
            className='
            transform -translate-y-24  
            rounded-full
            ring-4 ring-gray-700 
            dark:ring-gray-800 
            hover:ring-gray-100
            transition-color  transform duration-200
            '
            src={auth?.user.image || ''}

          >
            {!auth?.user.image && (
              <span className='text-5xl'>{auth.user?.firstName.charAt(0).toUpperCase()}</span>
            )}


          </Avatar>


          {true ? (
            <Button onClick={handleOpenProfileModal} class="
            text-gray-100 bg-white border border-gray-300  font-kanit rounded-full 
            text-sm px-5 py-2.5 me-2 mb-2  dark:text-white dark:border-gray-700 
            dark:hover:bg-gray-700 dark:hover:border-gray-600 ">
              Edit Profile
            </Button>
          ) : (
            <Button class="
            bg-gray-800 hover:bg-gray-900 focus:outline-none 
             font-kanit rounded-full text-sm px-5 
            py-2.5 me-2 mb-2 dark:bg-gray-100 dark:hover:bg-gray-600 
            dark:border-gray-700 dark:hover:text-gray-100" >
              Follow
            </Button>
          )}
        </div>

        <div className='px-5'>

          <div>
            <h1 className='font-kanit  text-gray-50 text-xl' >{auth.user?.firstName + " " + auth.user?.lastName}</h1>
            <p className='opacity-70 font-kanit-regular text-gray-200' >

              @{auth.user?.nickname || auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}


            </p>
          </div>


          <div >
            <p className='text-gray-100 py-5' >{auth.user?.content}</p>
          </div>

          <div className='flex gap-2 items-center'>





            <a href='/following' className='hover:underline' style={{ color: 'white' }} >
              <span className='text-gray-100 font-kanit' >
                <span className='font-bold'>{followingsCount}</span>
                <span > Following</span>
              </span>
            </a>

            <a href='/followers' className='hover:underline' style={{ color: 'white' }} >
              <span className='text-gray-100 font-kanit' >
                <span className='font-bold '>{followersCount}</span>
                <span> Followers</span>
              </span>
            </a>
          </div>




        </div>

        <section  >
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }} >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="gray-100"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              className='text-gray-100  '

              TabIndicatorProps=

              {{
                style: {
                  background: '#1d9bf0',
                  height: '0.25rem',
                  borderRadius: '4rem',
                  marginLeft: '0.375rem',
                  marginRight: '0.375rem',
                },

              }}






            >
              {tabs.map((item) => <Tab
                sx={{
                  fontWeight: value === item.value ? 'bold' : 'font-kanit',
                  color: 'white',
                }}
                value={item.value} label={item.name} wrapped

              />)}


            </Tabs>
          </Box>

          <div className='flex justify-center ' style={{ backgroundColor: "#44359e" }} >

            {value === "post" ? (
              <div className='flex flex-wrap gap-2 justify-center'>
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div className='rounded-md py-5 px-2' key={post.id}>
                      <PostCard item={post} />
                    </div>
                  ))
                ) : (
                  <p className='text-gray-100 font-kanit py-5'>Post Not Found</p>
                )}



              </div>




            ) : value === "reels" ?
              <div className='flex flex-wrap gap-2 justify-center' style={{ backgroundColor: "#44359e" }} >

                {userReels.length > 0 ? (
                  userReels.map((item) => (
                    <div className='rounded-lg px-2' key={item.id}>
                      <UserReelCard item={item} />
                    </div>
                  ))
                ) : (
                  <p className='text-gray-100 font-kanit py-5'>Reels Not Found</p>

                )}

              </div> : value === "saved" ?
                <div className='flex flex-wrap gap-2 justify-center  ' style={{ backgroundColor: "#44359e" }}>

                  {savedPosts.length > 0 ? (
                    savedPosts.map((post) => (
                      <div className='rounded-md py-5 px-2' key={post.id}>
                        <PostCard item={post} />
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-100 font-kanit py-5'>Saved Not Found</p>
                  )}

                </div> : (

                  <div className='flex flex-wrap gap-2 justify-center  ' style={{ backgroundColor: "#44359e" }}>

                    {likedPosts.length > 0 ? (
                      likedPosts.map((post) => (
                        <div className='rounded-md py-5 px-2' key={post.id}>
                          <PostCard item={post} />
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-100 font-kanit py-5'>Liked Not Found</p>
                    )}

                  </div>
                )}



          </div>

        </section>
      </div>



      <section>
        <ProfileModal open={open} handleClose={handleClose} initialValues={auth.user} />
      </section>




    </Card>
  )
}

export default Profile
