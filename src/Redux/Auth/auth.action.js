import axios from 'axios';
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_FOLLOWERS_COUNT_REQUEST, GET_FOLLOWERS_COUNT_SUCCESS, GET_FOLLOWERS_DETAILS_REQUEST, GET_FOLLOWERS_DETAILS_SUCCESS, GET_FOLLOWINGS_COUNT_FAILURE, GET_FOLLOWINGS_COUNT_REQUEST, GET_FOLLOWINGS_COUNT_SUCCESS, GET_FOLLOWING_DETAILS_REQUEST, GET_FOLLOWING_DETAILS_SUCCESS, GET_LAST_FIVE_USERS_FAILURE, GET_LAST_FIVE_USERS_REQUEST, GET_LAST_FIVE_USERS_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_POST_FAILURE, GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SET_USER_ID, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_FOLLOWING_FAILURE, USER_FOLLOWING_REQUEST, USER_FOLLOWING_SUCCESS, USER_UNFOLLOWING_FAILURE, USER_UNFOLLOWING_REQUEST, USER_UNFOLLOWING_SUCCESS } from './auth.actionType';
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
        console.log("user login fail ------", error);
        if (error.response && error.response.status === 400) {
            dispatch({ type: LOGIN_FAILURE, payload: 'Invalid email or password' });
        } else {
            dispatch({ type: LOGIN_FAILURE, payload: 'An error occurred. Please try again later.' });
        }
        throw error; // Throw error on failure

    }
}

export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data);

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("register----", data);
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log("user register fail ------", error);
        if(error.response && error.response.status === 400){
            dispatch({ type: REGISTER_FAILURE, payload: "Account already exists." });
        }else{
            dispatch({ type: REGISTER_FAILURE, payload: "Account already exists." });

        }
        throw error;
    }
}

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });

    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                });


        console.log("profile----", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("user get fail------", error);
        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
}


export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData);


        console.log("update profile ----", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("user update fail ------", error);
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
}





export const userGetPostCount = (jwt, userId) => async (dispatch) => {
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
        console.log("user get post count fail------", error);
        dispatch({ type: GET_USER_POST_FAILURE, payload: error });
    }
}


export const userFollowingsCount = (jwt, userId) => async (dispatch) => {
    dispatch({ type: GET_FOLLOWINGS_COUNT_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/followingscount/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("followings_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_FOLLOWINGS_COUNT_SUCCESS, payload: data });
    } catch (error) {
        console.log("user follow count fail------", error);
        dispatch({ type: GET_FOLLOWINGS_COUNT_FAILURE, payload: error });
    }

}


export const userFollowersCount = (jwt, userId) => async (dispatch) => {
    dispatch({ type: GET_FOLLOWERS_COUNT_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/followerscount/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("followings_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_FOLLOWERS_COUNT_SUCCESS, payload: data });
    } catch (error) {
        console.log("user followers count fail------", error);
        dispatch({ type: GET_FOLLOWINGS_COUNT_FAILURE, payload: error });
    }

}

export const getFollowingDetails = (jwt,userId) => async (dispatch) => {
  
    dispatch({ type: GET_FOLLOWING_DETAILS_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/following-details/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("followings_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_FOLLOWING_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        console.log("user followings count fail------", error);
        dispatch({ type: GET_FOLLOWING_DETAILS_REQUEST, payload: error });
    }

}

export const getFollowersDetails = (jwt,userId) => async (dispatch) => {
  
    dispatch({ type: GET_FOLLOWERS_DETAILS_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/followers-details/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("followers_count ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_FOLLOWERS_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        console.log("user followers count fail------", error);
        dispatch({ type: GET_FOLLOWERS_DETAILS_REQUEST, payload: error });
    }

}


export const userFollowAction = (jwt,userId) => async (dispatch) => {
  
    dispatch({ type: USER_FOLLOWING_REQUEST });

    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users/follow/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("User Follow Success ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: USER_FOLLOWING_SUCCESS, payload: data });
    } catch (error) {
        console.log("User Follow Failed -----", error);
        dispatch({ type: USER_FOLLOWING_FAILURE, payload: error });
    }

}

export const userunFollowAction = (jwt,userId) => async (dispatch) => {
  
    dispatch({ type: USER_UNFOLLOWING_REQUEST });

    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users/unfollow/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("User UNFollow Success ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: USER_UNFOLLOWING_SUCCESS, payload: data });
    } catch (error) {
        console.log("User UNFollow Failed -----", error);
        dispatch({ type: USER_UNFOLLOWING_FAILURE, payload: error });
    }

}


export const getAllUsersAction = (jwt) => async (dispatch) => {
  
    dispatch({ type: GET_ALL_USERS_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/get-all-popular-users`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("User GETALL Success ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
        console.log("User GETALL Failed -----", error);
        dispatch({ type: GET_ALL_USERS_FAILURE, payload: error });
    }

}


export const getLastFiveUsersAction = (jwt) => async (dispatch) => {
  
    dispatch({ type: GET_LAST_FIVE_USERS_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/last-five-followings`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("User LAST Success ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: GET_LAST_FIVE_USERS_SUCCESS, payload: data });
    } catch (error) {
        console.log("User LAST Failed -----", error);
        dispatch({ type: GET_LAST_FIVE_USERS_FAILURE, payload: error });
    }

}







export const logoutUserAction = () => async (dispatch) => {

    try {
        await axios.post(`${API_BASE_URL}/auth/logout`);
        localStorage.removeItem("jwt"); // localStorage'dan JWT'yi kaldır
        dispatch({ type: LOGOUT_SUCCESS }); // Logout işleminin 

    } catch (error) {
        console.log("Logout failed:", error);
        // Logout işlemi başarısız olursa uygun bir işlem yapabilirsiniz
    }

}

export const searchUserAction = (jwt, query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST });

    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/search?query=${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("SEARCH Success ----", data); // Payload değerini konsola yazdırın
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("User search failed:", error);
        dispatch({ type: SEARCH_USER_FAILURE, payload: error });
    }
};


export const setUserId = (userId) => {
    return {
        type: SET_USER_ID,
        payload: userId,
    };
};


