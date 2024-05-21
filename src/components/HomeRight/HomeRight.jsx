import React, { useEffect, useState } from 'react'
import PopularUserCard from './PopularUserCard'

import SearchUser from '../SearchUser/SearchUser';
import { Avatar, Box, Button, Card, CardHeader, Divider, Tab, Tabs } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../Redux/Auth/auth.action';
import { getFollowersDetails, getFollowingDetails, userFollowAction, userunFollowAction } from '../../Redux/Auth/auth.action';
import { Link } from 'react-router-dom';

const popularUser = [1, 1, 1, 1]






const HomeRight = () => {
  
  const tabs = [
    { value: "following", name: "Following", },
    { value: "followers", name: "Followers", },

]


const { auth } = useSelector((state) => state);
const dispatch = useDispatch();

const [value, setValue] = useState("following");
const handleChange = (event, newValue) => {
    setValue(newValue);
};




useEffect(() => {
    if (auth.user?.id) {
        dispatch(getFollowingDetails(localStorage.getItem('jwt'), auth.user?.id));
        dispatch(getFollowersDetails(localStorage.getItem('jwt'), auth.user?.id));
        dispatch(getAllUsersAction(localStorage.getItem('jwt')));


    }
}, [auth.user, dispatch]);

const userPosts = auth.followingDetails;
const userGetFollowers = auth.followersDetails;
const userPopulars = auth.popularUser;


useEffect(() => {
    const path = window.location.pathname;
    const tab = tabs.find(item => `/${item.value}` === path);
    if (tab) {
        setValue(tab.value);
    }
}, []);

const handleFollow = (userId) => {
    // Kullanıcıyı takip etme işlemi
    dispatch(userFollowAction(localStorage.getItem('jwt'), userId));
};

const handleunFollow = (userId) => {
    // Kullanıcıyı takip etme işlemi
    dispatch(userunFollowAction(localStorage.getItem('jwt'), userId));
};






console.log("userPopulars:", userPopulars);





  return (
    <div className='py-5  md:max-xl:px-40  '>
      
      <SearchUser 
      
      
      
      />
      {/* flex-nowrap w-[25rem] min-w-fit */}
      {/*w-4/5    md:max-xl:mt-10 min-h-lvh */}
      {/* flex flex-col justify-between py-4 min-h-lvh */}
      
      <Card className=' p-5	 justify-center 	mt-2' style={{ backgroundColor: "#211b44" }}>
        <div className='flex justify-between py-5  items-center'>
          <p className='font-kanit text-gray-100 '>Suggestions for you</p>
          <a href="www.google.com.tr" class="text-sm font-kanit text-blue-500">View All</a>

        </div>

        <div className=''>


          
          
          {userPopulars && userPopulars.length > 0 && userPopulars.map((user) =>
          
            <PopularUserCard

            key={user.id} user={user}
            isFollowingControl={(auth.user.followings || []).some(followingId => followingId === user?.id)}

            handleAction={() => {
                if ((auth.user.followings || []).some(followingId => followingId === user?.id)) {
                    handleunFollow(user.id); // Kullanıcıyı takip etmiyorsa takip etme işlemini gerçekleştir
                    window.location.href = `/${value}`;

                } else {
                    handleFollow(user.id); // Kullanıcıyı takip ediyorsa takip etmeme işlemini gerçekleştir
                    window.location.href = `/${value}`;
                }
            }}

        />
        
        
        )
        
          
          }


        </div>
      </Card>





    </div>
  )
}

export default HomeRight
