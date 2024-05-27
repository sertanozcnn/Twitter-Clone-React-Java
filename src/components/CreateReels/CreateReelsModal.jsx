import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../utils/uploadToCloudniry';
import { Avatar, Box, Button, CircularProgress, Divider, IconButton, Modal } from '@mui/material';
import { IoIosClose } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { createReelsAction } from '../../Redux/Reels/reels.action';



//Modal View - Scroll

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'w-2/4	',
    bgcolor: '#211b44',
    border: '1px solid #000',
    boxShadow: 24,
    overflowY: 'auto', 
    maxHeight: '80vh',

};







const CreateReelsModal = ({ handleClose, open }) => {

    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const [loading, setLoading] = React.useState(false);
    const [selectedVideo, setSelectedVideo] = useState();


    const handleSubmit = async (values) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(createReelsAction(values))
        setLoading(false);
        handleClose();
        console.log("formik values", values);
    }

    //Form Reels Values
    const formik = useFormik({
        initialValues: {
            title: "",
            video: "",
        },
        onSubmit: handleSubmit,
    });



    const handleSelectVideo = async (event) => {
        setLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setLoading(false);
        formik.setFieldValue("video", videoUrl);


    }

    const handleRemoveVideoAndClose = () => {
        setSelectedVideo(null); 
        handleClose(); 
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='rounded-xl px-4 py-4  w-1/3'   >
                    <form onSubmit={formik.handleSubmit}  >

                        <div className='flex items-center justify-between my-2'>
                            <div className='flex items-center space-x-2 -ml-4 -mt-5 '>
                                <IconButton onClick={handleRemoveVideoAndClose}  >
                                    <IoIosClose color='white' size={32} />
                                </IconButton >
                            </div>
                        </div>
                        <div className='space-y-2 block w-full flex justify-between'>
                            <Avatar
                                src={auth?.user.image || ''}
                                sx={{ bgcolor: auth?.user.image ? "transparent" : auth?.user.randomProfileColorCode }} aria-label="recipe">
                                {!auth?.user.image && (
                                    <span className='text-xl' >{auth.user?.firstName.charAt(0).toUpperCase()}</span>
                                )}
                            </Avatar>
                            <textarea
                                type='text'
                                onChange={(e) => {
                                    formik.setFieldValue('title', e.target.value);
                                }}
                                value={formik.values.caption}
                                placeholder="Video Title"
                                rows="4"
                                style={{ resize: 'none' }} 
                                class="
                                mr-4
                                text-lg
                                peer 
                                h-full w-[90%]
                                text-gray-200
                                bg-transparent  
                                px-5 
                                pb-1.5 font-normal 
                                outline outline-0 
                                transition-all placeholder-shown:border-blue-gray-200 
                                focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 bg-purple" >
                            </textarea>
                        </div>

                        
                        {selectedVideo && <video class="w-full "
                            posterResizeMode="cover"
                            resizeMode="cover"
                            controls >
                            <source src={selectedVideo} type="video/mp4" />
                        </video>
                        }

                        <div className='mt-4 ml-2 mr-2'>
                            <Divider style={{ backgroundColor: '#d7dae0' }} />
                        </div>


                        <div className='flex justify-start space-x-3 mt-3 '>

                            <div className='flex items-center  '>

                                <input
                                    type='file'
                                    accept='video/*'
                                    onChange={handleSelectVideo}
                                    style={{ display: "none" }}
                                    id='video-input'
                                />
                                <label htmlFor='video-input'>
                                    <IconButton color='primary'
                                        component="span"
                                    >
                                        <IoVideocamOutline style={{ color: '#b3bbc6' }} />
                                    </IconButton>
                                </label>
                                <span className='font-kanit-regular text-gray-300'>Video</span>

                            </div>


                            <div className='flex items-center' style={{ marginLeft: 'auto' }}>
                                <Button
                                    class="
                           
                                        bg-gray-800 hover:bg-gray-900 focus:outline-none 
                                        font-kanit rounded-full text-sm px-5 
                                        py-2.5  dark:bg-gray-100 dark:hover:bg-gray-600 
                                        dark:border-gray-700 dark:hover:text-gray-100"
                                    type='submit'>
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Reels"
                                    )}
                                </Button>
                            </div>
                        </div>

                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateReelsModal
