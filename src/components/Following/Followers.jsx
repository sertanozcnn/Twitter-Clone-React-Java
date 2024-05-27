import {  Box,  Card,  Divider, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCardFollowing from './UserCardFollowing';
import { getFollowersDetails, getFollowingDetails, userFollowAction, userunFollowAction } from '../../Redux/Auth/auth.action';
import { Link } from 'react-router-dom';

const Followers = () => {


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

        }
    }, [auth.user, dispatch]);

    const userPosts = auth.followingDetails;
    const userGetFollowers = auth.followersDetails;
    const isFollowingControl = false;


    console.log("isFollowingControl",isFollowingControl);
    console.log("auth user",auth.user);

    useEffect(() => {
        const tabs = [
            { value: "following", name: "Following", },
            { value: "followers", name: "Followers", },
    
        ]
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
        // Kullanıcıyı takip çıkarma
        dispatch(userunFollowAction(localStorage.getItem('jwt'), userId));
      };


    return (
        <Card className=' w-4/5    md:max-xl:mt-10  min-h-lvh' style={{ backgroundColor: "#211b44", borderRadius: "0px" }} >

        <div className='rounded-md  mb-2'>
            <div className='p-2 pl-5'>
                <div className='flex items-start'  >
                    <h1 className='font-kanit  text-gray-50 text-2xl font-bold  ' >{auth.user?.firstName + " " + auth.user?.lastName}</h1>
                </div>
                <p className='opacity-70 font-kanit-regular text-gray-200' >
                    @{auth.user?.nickname || auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}
                </p>

            </div>
        </div>


        <section className='w-full' >
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="gray-100"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    className='text-gray-100 '
                    TabIndicatorProps={{ style: { background: '#1d9bf0', height: '0.25rem', borderRadius: '4rem', marginLeft: '0.375rem', marginRight: '0.375rem' } }}

                >
                    {tabs.map((item) => <Tab
                        component={Link}
                        to={`/${item.value}`}

                        value={item.value} label={item.name} sx={{ minWidth: '49%', maxWidth: '16rem', }} />)}
                </Tabs>
            </Box>


            <div className=''>
                <Divider className='opacity-50' style={{ backgroundColor: '#d7dae0' }} />
            </div>



            <div className='flex-col py-2 px-2'>
                {value === "following" && userPosts.map((user) => (
                    <UserCardFollowing 
                    
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
                ))}
                {value === "followers" && userGetFollowers.map((user) => (
                    <UserCardFollowing 
                    key={user.id} 
                    user={user} 
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
                ))}
            </div>


        </section>














    </Card>

    )
}

export default Followers
