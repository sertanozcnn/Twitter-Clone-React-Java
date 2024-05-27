import { Avatar, Button, CardHeader } from '@mui/material'
import React from 'react'
const PopularUserCard = ({ user, isFollowingControl, handleAction, currentUser }) => {


    const [isFollowing, setIsFollowing] = React.useState(true);

    const handleMouseOver = () => {
        setIsFollowing(false);
    };

    const handleMouseOut = () => {
        setIsFollowing(true);
    };




    return (
        <div className='flex- ' >

            <CardHeader
                className=''
                avatar={
                    currentUser.id !== user.id ? (

                        <Avatar
                            src={user.image || ''}
                            sx={{ bgcolor: user.image ? "transparent" : user.randomProfileColorCode }} aria-label="recipe">
                            <span >{user.firstName.charAt(0).toUpperCase()}</span>


                        </Avatar>

                    ) : null
                }


                action={
                    currentUser.id !== user.id ? (
                        isFollowingControl ? (
                            <Button class="
                            text-gray-100 bg-white border border-gray-300  font-kanit rounded-full 
                            text-sm px-5 py-2.5 me-2 mb-2  dark:text-white dark:border-gray-700 
                            dark:hover:border-red-600  dark:hover:text-red-600 "
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onClick={handleAction} // handleAction prop'u kullanıldı


                            >
                                {isFollowing ? "Following" : "Unfollow"}

                            </Button>
                        ) : (
                            <Button class="
                            bg-gray-800 hover:bg-gray-900 focus:outline-none 
                            font-kanit rounded-full text-sm px-5 
                            py-2.5 me-2 mb-2 dark:bg-gray-100 dark:hover:bg-gray-600 
                            dark:border-gray-700 dark:hover:text-gray-100"
                                onClick={handleAction}
                            >
                                Followed
                            </Button>
                        )
                    ) : null
                }

                title={
                    currentUser.id !== user.id ? (
                        <p className='font-kanit text-gray-50 text-base'>{user.firstName + " " + user.lastName}

                        </p>
                    ) : null
                }
                subheader={
                    currentUser.id !== user.id ? (
                        <p className='opacity-70 font-kanit-regular text-sm text-gray-200'>
                            @{user.nickname || user.firstName.toLowerCase() + "_" + user.lastName.toLowerCase()}

                        </p>
                    ) : null
                }

            />


        </div>
    )
}

export default PopularUserCard
