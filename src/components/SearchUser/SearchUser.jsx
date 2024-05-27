import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction, userFollowAction, userunFollowAction } from '../../Redux/Auth/auth.action';
import { Avatar, Button, CardHeader } from '@mui/material';

const SearchUser = () => {

  const [query, setQuery] = useState(''); // Arama sorgusu için state tanımı
  
  const dispatch = useDispatch(); // Redux action'larına erişmek için dispatch fonksiyonunu alın
  const { auth } = useSelector(store => store);
  const [userSearchSubmit, setUserSearchSubmit] = useState([]); // Arama sonuçları için state tanımı

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchUserAction(localStorage.getItem('jwt'), query));
  };



  const [isFollowing, setIsFollowing] = React.useState(true);



  const handleMouseOver = () => {
    setIsFollowing(false);
  };

  const handleMouseOut = () => {
    setIsFollowing(true);
  };

  const handleAction = (userId) => {
    if ((auth.user.followings || []).some(followingId => followingId === userId)) {
      handleunFollow(userId);
      window.location.href = `/following`;
    } else {
      handleFollow(userId);
      window.location.href = `/following`;
    }
  };

  const isFollowingControl = (userId) => {
    return (auth.user.followings || []).some(followingId => followingId === userId);
  };

  const handleFollow = (userId) => {
    // Kullanıcıyı takip etme işlemi
    dispatch(userFollowAction(localStorage.getItem('jwt'), userId));
  };

  const handleunFollow = (userId) => {
    // Kullanıcıyı takip etme işlemi
    dispatch(userunFollowAction(localStorage.getItem('jwt'), userId));
  };



  const clearSearchResults = () => {
    setUserSearchSubmit([]); // Arama sonuçlarını temizle
    setQuery(''); // Query'yi temizle
  };



  React.useEffect(() => {
    setUserSearchSubmit(auth.usersSearch);
  }, [auth.usersSearch]);

  React.useEffect(() => {
    if (query === '') {
      clearSearchResults();
    }
  }, [query]);

  console.log("userSearchSubmit---- ", userSearchSubmit);




  return (
    <div>
      <form onSubmit={handleSearch} class="max-w-md mx-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500  " style={{ color: 'white' }} aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search" id="default-search"
            class="block w-full 
          p-4 ps-10 text-sm text-gray-100 border 
          border-gray-300 rounded-lg focus:ring-blue-500 
          dark:bg-searchColor dark:border-gray-600 
          placeholder-gray-100
         " placeholder="Search Mockups, Logos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}

            required />
          <button
            type="submit"
            class="text-gray-100 
            
            absolute 
            end-2.5 
            bottom-2.5 
          
          font-medium 
          rounded-lg 
          text-sm 
          px-4 
          py-2 
          transition-all 
          duration-300
          dark:bg-blue-600 
          dark:hover:bg-blue-700 
          dark:focus:ring-blue-800
          bg-blue-700 

          
          ">Search</button>

        </div>
      </form>

      {userSearchSubmit && userSearchSubmit.length > 0 && userSearchSubmit.map((user) => (
        <div key={user.id}>
          {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}

          <CardHeader


            className='p-5	 justify-center 	mt-2 rounded-md flex justify-between items-center '


            avatar={
              <Avatar
                src={user.image || ''}
                sx={{ bgcolor: user.image ? "transparent" : user.randomProfileColorCode }} aria-label="recipe">
                <span >{user.firstName.charAt(0).toUpperCase()}</span>


              </Avatar>
            }
            action={
              isFollowingControl(user.id) ? (
                <Button class="
                  text-gray-100 bg-white border border-gray-300  font-kanit rounded-full 
                  text-sm px-5 py-2.5 me-2 mb-2  dark:text-white dark:border-gray-700 
                  dark:hover:border-red-600  dark:hover:text-red-600 "
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={() => handleAction(user.id)}


                >
                  {isFollowing ? "Following" : "Unfollow"}

                </Button>
              ) : (
                <Button class="
                  bg-gray-800 hover:bg-gray-900 focus:outline-none 
                  font-kanit rounded-full text-sm px-5 
                  py-2.5 me-2 mb-2 dark:bg-gray-100 dark:hover:bg-gray-600 
                  dark:border-gray-700 dark:hover:text-gray-100"
                  onClick={() => handleAction(user.id)}

                >
                  Followed
                </Button>
              )
            }
            title={<p className='font-kanit text-gray-50 text-base'>{user.firstName + " " + user.lastName}</p>}

            subheader={<p className='opacity-70 font-kanit-regular text-sm text-gray-200'>
              @{user.nickname || user.firstName.toLowerCase() + "_" + user.lastName.toLowerCase()}

            </p>}
            style={{ backgroundColor: "#211b44" }}





          />



        </div>





      ))}
    </div>
  )
}

export default SearchUser
