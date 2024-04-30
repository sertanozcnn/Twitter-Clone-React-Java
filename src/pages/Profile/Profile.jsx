import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';


const tabs = [
  { value: "post", name: "Post", },
  { value: "reels", name: "Reels", },
  { value: "saved", name: "Saved", },
  { value: "repost", name: "Repost", },
]

const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPost = [1, 1, 1];

const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState('post');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className=' w-[80%] ' style={{ backgroundColor: "#211b44", borderRadius: "0px" }} >
      <div className='rounded-md'>
        <div className='p-2 pl-5'>



          <div className='flex items-start'  >
            <h1 className='font-kanit  text-gray-50 text-2xl font-bold' >John Doe</h1>
          </div>

          <div>

            <span className='text-gray-400 font-kanit' >
              <span className=''>4.165</span>
              <span > Post</span>
            </span>

          </div>
        </div>

        <div className='h-[15rem]' >
          <img
            className='w-full h-full rounded-t-md'
            src='https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />

        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem] '>

          <Avatar
            withBorder={true}
            sx={{ width: "10rem", height: "10rem" }}
            className='transform -translate-y-24  rounded-full ring-2 ring-gray-700 dark:ring-gray-800 '
            src='' />


          {true ? (
            <Button class="
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
            <h1 className='font-kanit  text-gray-50 text-xl' >John Doe</h1>
            <p className='opacity-70 font-kanit-regular text-gray-200' >@johndoe</p>
          </div>


          <div >
            <p className='text-gray-100 py-5' >Content</p>
          </div>

          <div className='flex gap-2 items-center'>





            <a href='/following' className='hover:underline' style={{ color: 'white' }} >
              <span className='text-gray-100 font-kanit' >
                <span className='font-bold'>159</span>
                <span > Following</span>
              </span>
            </a>

            <a href='/followers' className='hover:underline' style={{ color: 'white' }} >
              <span className='text-gray-100 font-kanit' >
                <span className='font-bold'>250</span>
                <span> Followers</span>
              </span>
            </a>
          </div>




        </div>

        <section >
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="gray-100"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              className='text-gray-100'
              TabIndicatorProps={{ style: { background: 'white' } }}

            >
              {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}


            </Tabs>
          </Box>

          <div className='flex justify-center'>

            {value === "post" ? (
              <div className='flex flex-wrap gap-2 justify-center mt-4'>

                {posts.map((item) => (

                  <div className=' border-slate-500 rounded-md' >

                    <PostCard />

                  </div>
                ))}

              </div>
            ) : value === "reels" ?
              <div className='flex flex-wrap gap-2 justify-center mt-4 '>

                {reels.map((item) => <UserReelCard />)}

              </div> : value === "saved" ?
                <div className='flex flex-wrap gap-2 justify-center mt-4 '>

                  {savedPost.map((item) => <PostCard />)}

                </div> : (

                  <div className='mt-5 text-gray-100 font-kanit'>Repost</div>
                )}
  


          </div>
        </section>

      </div>
    </Card>
  )
}

export default Profile
