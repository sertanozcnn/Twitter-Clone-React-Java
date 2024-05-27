import { API_BASE_URL, api } from '../../config/api';
import { CREATE_REELS_FAILURE, CREATE_REELS_REQUEST, CREATE_REELS_SUCCESS, GET_USERS_ALL_REELS_FAILURE, GET_USERS_ALL_REELS_REQUEST, GET_USERS_ALL_REELS_SUCCESS, GET_USERS_REELS_FAILURE, GET_USERS_REELS_REQUEST, GET_USERS_REELS_SUCCESS } from './reels.actionType';


export const createReelsAction = (reelsData) => async (dispatch) => {

    dispatch({ type: CREATE_REELS_REQUEST })
    try {
        const { data } = await api.post(`/api/reels`, reelsData);
        dispatch({ type: CREATE_REELS_SUCCESS, payload: data });
         //console.log("Created REELS", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: CREATE_REELS_FAILURE, payload: error })
    }
}





export const getLastReelsByUserIdAction = (jwt, userId) => async (dispatch) => {

    dispatch({ type: GET_USERS_REELS_REQUEST })
    try {

        const { data } = await api.get(`${API_BASE_URL}/api/reels/user/last-reels/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });


        dispatch({ type: GET_USERS_REELS_SUCCESS, payload: data });



         //console.log("Get Users REELS", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: GET_USERS_REELS_FAILURE, payload: error })
    }
}

export const getAllReelsUsers = (jwt, userId) => async (dispatch) => {

    dispatch({ type: GET_USERS_ALL_REELS_REQUEST })
    try {

        const { data } = await api.get(`${API_BASE_URL}/api/reels/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });


        dispatch({ type: GET_USERS_ALL_REELS_SUCCESS, payload: data });



         //console.log("Get ALL USERS REELS", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: GET_USERS_ALL_REELS_FAILURE, payload: error })
    }
}