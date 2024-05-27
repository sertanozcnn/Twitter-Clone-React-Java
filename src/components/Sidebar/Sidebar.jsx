import React, { useEffect, useState } from 'react'; // useState import edildi
import { navigationMenu } from './SidebarNavigation';
import { Alert, Avatar, Button, Card, CircularProgress, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { MdAccountCircle, MdMoreHoriz, MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

import { logoutUserAction } from '../../Redux/Auth/auth.action';
import ViewReelsModal from '../CreateReels/ViewReelsModal';

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C8865B" />
            <stop offset="100%" stopColor="#F58943" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress thickness={6} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}



const Sidebar = () => {
  const { auth } = useSelector(store => store);
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [openViewReelsModal, setOpenViewReelsModal] = useState(false);
  const handleCloseViewReelsModal = () => setOpenViewReelsModal(false);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenViewReelsModal = (userId) => {
    setSelectedUserId(userId);
    setOpenViewReelsModal(true);
  };


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await dispatch(logoutUserAction()); 




      setTimeout(() => {
        setLoading(false);
        window.location.href = '/';
        setSuccess('Logout successful.');
      }, 3000


      );


    } catch (error) {
      console.error('Logout failed:', error);
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = async () => {
    window.location.href = `/profile/${auth.user?.id}`;
  }
  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth.user?.id}`)
    }
    if (item.title === "Home") {
      navigate(`/`)
    }
    if (item.title === "Reels") {
      handleOpenViewReelsModal(auth.user?.id); 
    }


  }

  return (
    <Card className='card flex flex-col justify-between py-4 min-h-lvh	' style={{ backgroundColor: "#211b44", borderRadius: "0px" }}>
      <div className='space-y-8 pl-4 pr-4'>
        <div className=''>
          <img className='size-1/5' src="https://r.resimlink.com/gqN9f.png" alt="" />
        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item) => (
            <div onClick={() => handleNavigate(item)} key={item.title} 
            className='cursor-pointer flex space-x-3 items-center  rounded-full p-1.5
            
            text-gray-50 
            font-kanit 
            hover:bg-gray-500  
            overflow-hidden
            
            transition-all 
            before:absolute 
            before:bottom-0 
            before:left-0 
            before:top-0 before:z-0 
            before:h-full before:w-0 
            before:bg-gray-500 
            before:transition-all 
            before:duration-500 
            hover:bg-white 
            hover:shadow-red-500 
            hover:before:left-0 
            hover:before:w-full
            relative
            '
            
            >
              <span className='relative z-10' >{item.icon}</span>
              <p className='text-xl relative z-10'>{item.title}</p>
            </div>
          ))}
        </div>




      </div>

      <div>


        <div className='mt-4 ml-4 mr-4'>
          <Divider style={{ backgroundColor: '#d7dae0' }} />
        </div>
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>

            <Avatar
              src={auth?.user.image || ''}
              sx={{
                bgcolor: auth?.user.image
                  ? "transparent"
                  : auth?.user.randomProfileColorCode
              }} aria-label="recipe">
              {!auth?.user.image && (
                <span className='text-xl' >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
              )}
            </Avatar>



            <div>
              <p className='font-kanit text-gray-50'>{auth.user?.firstName + " " + auth.user?.lastName}</p>
              <p className='opacity-70 font-kanit-regular text-gray-200'>

                @{auth.user?.nickname || auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}

              </p>
            </div>
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MdMoreHoriz size={25} color='white' />

          </Button>
          
          <Menu


            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
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
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <MdAccountCircle color='white' size={24} />
              </ListItemIcon>
              <span className='text-gray-100 font-kanit'>Profile</span>



            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <MdOutlineLogout color='white' size={20} />

              </ListItemIcon>
              <span className='text-gray-100 font-kanit'>Logout</span>

            </MenuItem>



          </Menu>

          {success && (
            <div className="fixed bottom-4 left-0 right-0 flex justify-center">
              <Alert ariant="filled" severity="info" style={{ color: 'text-gray-100' }}>
                {success}
              </Alert>
            </div>
          )}

          {loading && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
              <GradientCircularProgress thickness={6} />
            </div>
          )}



        </div>

  
      <div>
          <ViewReelsModal
            userId={selectedUserId}
            handleClose={handleCloseViewReelsModal}
            open={openViewReelsModal} />
        </div>
      </div>

    </Card>



  );
};

export default Sidebar;
