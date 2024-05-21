import { Avatar, Box, Button, Card, Divider, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from '../Profile/ProfileModal';
import { getProfileAction, userFollowersCount, userFollowingsCount, userGetPostCount } from '../../Redux/Auth/auth.action';
import { getSavedPostAction, getUsersPostAction } from '../../Redux/Post/post.action';
import { getAllReelsUsers } from '../../Redux/Reels/reels.action';

const tabs = [
  { value: "post", name: "Post", },
  { value: "reels", name: "Reels", },
  { value: "saved", name: "Saved", },
  { value: "repost", name: "Repost", },
]

const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1,1,1];
const savedPost = [1, 1, 1];

const Profile = ({ lg }) => {
  const gridLg = lg || 6; // Eğer lg prop'u tanımlı değilse, varsayılan olarak 6 kullan

  const { id } = useParams();

  const { auth, post,reels } = useSelector(store => store);
  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("post");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction(localStorage.getItem('jwt')));
    dispatch(userGetPostCount(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(userFollowingsCount(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(userFollowersCount(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getUsersPostAction(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getSavedPostAction(localStorage.getItem('jwt'), auth.user?.id));
    dispatch(getAllReelsUsers(localStorage.getItem('jwt'), auth.user?.id));
  }, []);

  console.log("auth", auth);

  const userPosts = post.posts;
  const savedPosts = post.savedPosts;
  const postCount = auth.postCount;
  const followingsCount = auth.followingsCount;
  const followersCount = auth.followersCount;
  const userReels = reels.allReels;

  //const userListLast = reels.viewReels || [];



  console.log("postCount", postCount);
  console.log("savedPosts -----", savedPosts);
  console.log("userreels -----", userReels);
  return (
    <Card className=' w-4/5    md:max-xl:mt-10 min-h-lvh ' style={{ backgroundColor: "#211b44", borderRadius: "0px" }} >
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
            className='w-full h-full rounded-t-md '
            src='https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />

        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem] '>

          <Avatar
            withBorder={true}
            sx={{ width: "10rem", height: "10rem", bgcolor: auth?.user.image ? "transparent" : auth?.user.randomProfileColorCode }}
            className='transform -translate-y-24  rounded-full ring-4 ring-gray-700 dark:ring-gray-800 '
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

        <div className='px-5 '>

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
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="gray-100"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              className='text-gray-100 '
              TabIndicatorProps={{ style: { background: 'white' } }}

            >
              {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}


            </Tabs>
          </Box>

          <div className='flex justify-center  '>

            {value === "post" ? (
              <div className='flex flex-wrap gap-2 justify-center  ' style={{ backgroundColor: "#44359e" }}>


                {userPosts.map((post) => (
                  <div className=' rounded-md  py-5 px-2' key={post.id}>
                    <PostCard item={post} />
                  </div>
                )
                )}



              </div>




            ) : value === "reels" ?
              <div className='flex flex-wrap gap-2 justify-center' style={{ backgroundColor: "#44359e" }} >

                {userReels.map((item) =>


                (

                  <div className=' rounded-lg px-2 ' >
                    <UserReelCard item={item} />
                  </div>
                )
                )


                }

              </div> : value === "saved" ?
                <div className='flex flex-wrap gap-2 justify-center  ' style={{ backgroundColor: "#44359e" }}>

                  {savedPosts.map((post) => (
                    <div className=' rounded-md  py-5 px-2' key={post.id}>
                      <PostCard item={post} />
                    </div>
                  )
                  )}

                </div> : (

                  <div className='mt-5 text-gray-100 font-kanit'>Repost</div>
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
