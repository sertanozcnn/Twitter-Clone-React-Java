import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLastReelsByUserIdAction } from '../../Redux/Reels/reels.action';


const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'w-2/4	',
    bgcolor: '#211b44',
    border: '1px solid #000',
    boxShadow: 24,
    overflowY: 'auto', // Scroll yapılabilirlik ekledik
    maxHeight: '80vh',

};


const ViewReelsModal = ({ handleClose, open, userId }) => {
    const { reels } = useSelector(store => store);

    const dispatch = useDispatch();

    useEffect(() => {
        if (open && userId) {
            dispatch(getLastReelsByUserIdAction(localStorage.getItem('jwt'), userId));
        }
    }, [open, userId, dispatch]);


    const userListLast = reels.viewReels || [];
    console.log("user lastFive", userListLast)


    const videoUrl = userListLast.length > 0 ? userListLast[0]?.video : '';
    const title = userListLast.length > 0 ? userListLast[0]?.title : '';

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='rounded-lg  w-1/3 '>

                    <video 
                    className="w-full h-fit" 
                    posterResizeMode="cover"
                     resizeMode="cover" 
                     src={videoUrl} controls>
                        <source type="video/mp4" />
                    </video>

                    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', width: '100%' }}>
                        <p className='font-kanit text-gray-100' style={{ margin: 10 }}>{title}</p>
                    </div>
                </Box>
            </Modal>
        </div>
    )

}

export default ViewReelsModal;
