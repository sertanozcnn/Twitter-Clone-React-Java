import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import { Avatar, CircularProgress, IconButton } from '@mui/material';
import { IoIosClose } from "react-icons/io";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'w-2/4	',
  bgcolor: '#211b44',
  border: '1px solid #000',
  boxShadow: 24,

  overflowY: 'auto', // Scroll yapılabilirlik ekledik
  maxHeight: '80vh'
};

export default function ProfileModal({ open, handleClose, initialValues }) {

  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 3 saniye bekletme
    dispatch(updateProfileAction(values));
    setLoading(false);
    handleClose();
  }
  const formik = useFormik({
    initialValues, // initialValues prop'unu burada kullanın
    onSubmit: handleSubmit,
  });


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='rounded-xl px-4 py-4  w-1/3	'   >
          <form onSubmit={formik.handleSubmit}  >

            <div className='flex items-center justify-between my-2'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose}  >
                  <IoIosClose color='white' size={32} />
                </IconButton >
                <p className='font-kanit text-xl text-gray-100' >Edit Profile</p>
              </div>
              <Button
                class="
              bg-gray-800 hover:bg-gray-900 focus:outline-none 
               font-kanit rounded-full text-sm px-5 
              py-2.5 me-2 mb-2 dark:bg-gray-100 dark:hover:bg-gray-600 
              dark:border-gray-700 dark:hover:text-gray-100"
                type='submit'>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save"
                )}

              </Button>
            </div>
            <div>
              <div className='h-[15rem]'>
                <img src='https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='w-full h-full rounded-t-md' />

              </div>
              <div className='pl-5'>
                <Avatar className='transform -translate-y-24 ring-2 ring-gray-700 dark:ring-gray-800'
                  sx={{ width: "10rem", height: "10rem", bgcolor: auth?.user.randomProfileColorCode }}
                  src=''
                >
                  <span className='text-5xl' >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
                </Avatar>
              </div>
            </div>

            <div className='space-y-3 block w-full'>


              <label for="default-input" class="block mb-2 text-sm font-medium text-gray-100 dark:text-white">First Name</label>

              <input

                type="text"
                id="first_name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                class="
            bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg 
            focus:ring-blue-500 w-full p-3.5 dark:bg-gray-700"  required />

              <label for="default-input" class="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Last Name</label>

              <input

                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                class="
            bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg 
            focus:ring-blue-500  w-full p-3.5 dark:bg-gray-700"  required />



              <label for="default-input" class="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Nickname</label>

              <input

                type="text"
                id="nickname"
                name="nickname"
                value={formik.values.nickname}
                onChange={formik.handleChange}
                class="
              bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg 
              focus:ring-blue-500  w-full p-3.5 dark:bg-gray-700"  required />

              <label for="default-input" class="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Content</label>

              <input

                type="text"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                class="
                  bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg 
                  focus:ring-blue-500  w-full p-3.5 dark:bg-gray-700"  required />






            </div>

          </form>

        </Box>
      </Modal>
    </div>
  );
}