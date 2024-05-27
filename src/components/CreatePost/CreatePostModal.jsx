import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Avatar, CircularProgress, Divider, IconButton } from '@mui/material';
import { IoIosClose } from "react-icons/io";
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { uploadToCloudinary } from '../../utils/uploadToCloudniry';
import { createPostAction } from '../../Redux/Post/post.action';

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
    maxHeight: '80vh'
};


const CreatePostModal = ({ handleClose, open }) => {

    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();

    const handleSubmit = async (values) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); //3 seconds timeout
        dispatch(createPostAction(values))
        setLoading(false);
        handleClose();
        //console.log("formik values", values);
    }

    //post form value
    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: "",
        },
        onSubmit: handleSubmit,
    });


    //selected image activities

    const handleSelectImage = async (event) => {
        setLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setLoading(false);
        formik.setFieldValue("image", imageUrl);
    }

    //selected video activities

    const handleSelectVideo = async (event) => {
        setLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setLoading(false);
        formik.setFieldValue("video", videoUrl);
    }



    const handleRemoveVideoAndImageClose = () => {
        setSelectedVideo(null); //Reset selected video
        setSelectedImage(null);
        handleClose(); //close modal
    }

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
                                <IconButton onClick={handleRemoveVideoAndImageClose}  >
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
                                    formik.setFieldValue('caption', e.target.value);
                                }}
                                value={formik.values.caption}
                                placeholder="What's going on?"
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


                        {selectedImage && <div >
                            <img
                                src={selectedImage} alt=''
                                className="h-96 rounded-lg w-full object-cover object-center"
                            />
                        </div>
                        }

                        {selectedVideo && <video class="w-full rounded-lg "
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
                            <div className='flex items-center'>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={handleSelectImage}
                                    style={{ display: "none" }}
                                    id='image-input'
                                />
                                <label htmlFor='image-input'>
                                    <IconButton color='primary'
                                        component="span"
                                    >
                                        <IoImageOutline style={{ color: '#b3bbc6' }} />
                                    </IconButton>
                                </label>
                                <span className='font-kanit-regular text-gray-300' >Media</span>
                            </div>


                            <div className='flex items-center'>

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
                                        "Post"
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

export default CreatePostModal
