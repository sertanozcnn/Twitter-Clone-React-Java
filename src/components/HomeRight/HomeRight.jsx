import React, { useEffect, useState } from 'react'
import PopularUserCard from './PopularUserCard'

import SearchUser from '../SearchUser/SearchUser';
import { Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../Redux/Auth/auth.action';
import { getFollowersDetails, getFollowingDetails, userFollowAction, userunFollowAction } from '../../Redux/Auth/auth.action';






const HomeRight = () => {



  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [value, setValue] = useState("following");

  useEffect(() => {
    if (auth.user?.id) {
      dispatch(getFollowingDetails(localStorage.getItem('jwt'), auth.user?.id));
      dispatch(getFollowersDetails(localStorage.getItem('jwt'), auth.user?.id));
      dispatch(getAllUsersAction(localStorage.getItem('jwt')));


    }
  }, [auth.user?.id, dispatch]);

  const userPopulars = auth.popularUser;


  useEffect(() => {

    const tabs = [
      { value: "following", name: "Following" },
      { value: "followers", name: "Followers" }
    ];


    const path = window.location.pathname;
    const tab = tabs.find(item => `/${item.value}` === path);
    if (tab) {
      setValue(tab.value);
    }
  }, []);

  const handleFollow = (userId) => {
    dispatch(userFollowAction(localStorage.getItem('jwt'), userId));
  };

  const handleunFollow = (userId) => {
    dispatch(userunFollowAction(localStorage.getItem('jwt'), userId));
  };






  //console.log("userPopulars:", userPopulars);

  return (
    <div className='py-5  md:max-xl:px-10  '>

      <SearchUser />


      <Card className=' p-5	 justify-center 	mt-2' style={{ backgroundColor: "#211b44" }}>
        <div className='flex justify-between py-5  items-center'>
          <p className='font-kanit text-gray-100 '>Suggestions for you</p>
          <a href="www.google.com.tr" className="text-sm font-kanit text-blue-500">View All</a>

        </div>

        <div className=''>




          {userPopulars && userPopulars.length > 0 && userPopulars.map((user) =>

            <PopularUserCard

              key={user.id} user={user}
              isFollowingControl={(auth.user.followings || []).some(followingId => followingId === user?.id)}
              currentUser={auth.user}

              handleAction={() => {
                if ((auth.user.followings || []).some(followingId => followingId === user?.id)) {
                  handleunFollow(user.id); 
                  window.location.href = `/${value}`;

                } else {
                  handleFollow(user.id); 
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
