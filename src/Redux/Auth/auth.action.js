import axios from 'axios';
import { GET_FOLLOWERS_COUNT_REQUEST, GET_FOLLOWERS_COUNT_SUCCESS, GET_FOLLOWINGS_COUNT_FAILURE, GET_FOLLOWINGS_COUNT_REQUEST, GET_FOLLOWINGS_COUNT_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_POST_FAILURE, GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SET_USER_ID, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from './auth.actionType';
import { API_BASE_URL, api } from '../../config/api';

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("login success", data);

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
}

export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data);

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("register----", data);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
}

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });

    try {
        const { data } = await axios.
            get(`${API_BASE_URL}/api/users/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                });


        console.log("profile----", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
}


export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users`,reqData);


        console.log("update profile ----", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
}





export const userGetPostCount = (jwt,userId) => async (dispatch) => {
    dispatch({ type: GET_USER_POST_REQUEST });
    

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/postcount/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("post_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_USER_POST_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: GET_USER_POST_FAILURE, payload: error });
    }
}


export const userFollowingsCount = (jwt,userId)=>async (dispatch) =>{
    dispatch({ type: GET_FOLLOWINGS_COUNT_REQUEST});

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/followingscount/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("followings_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_FOLLOWINGS_COUNT_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: GET_FOLLOWINGS_COUNT_FAILURE, payload: error });
    }

}


export const userFollowersCount = (jwt,userId)=>async (dispatch) =>{
    dispatch({ type: GET_FOLLOWERS_COUNT_REQUEST});

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/followerscount/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("followings_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_FOLLOWERS_COUNT_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type:  GET_FOLLOWINGS_COUNT_FAILURE, payload: error });
    }

}



export const setUserId = (userId) => {
    return {
      type: SET_USER_ID,
      payload: userId,
    };
  };