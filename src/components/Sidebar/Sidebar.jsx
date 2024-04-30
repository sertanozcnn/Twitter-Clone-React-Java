import React, { useState } from 'react'; // useState import edildi
import { navigationMenu } from './SidebarNavigation';
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material';
import { MdMoreHoriz } from "react-icons/md";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // useState kullanıldı ve yanlış parantez düzeltildi
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className='card h-screen flex flex-col justify-between py-4 ' style={{ backgroundColor: "#211b44", borderRadius: "0px" }}>
      <div className='space-y-8 pl-4 pr-4'>
        <div className=''>
          <img className='size-1/5' src="https://r.resimlink.com/gqN9f.png" alt="" />
        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item) => (
            <div key={item.title} className='cursor-pointer flex space-x-3 items-center  text-gray-50 font-kanit hover:bg-gray-500  rounded-full p-0.5'>
              {item.icon}
              <p className='text-xl '>{item.title}</p>
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
            <Avatar />
            <div>
              <p className='font-kanit text-gray-50'>Sertan Ozcan</p>
              <p className='opacity-70 font-kanit-regular text-gray-200'>@sertanozcann</p>
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
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
