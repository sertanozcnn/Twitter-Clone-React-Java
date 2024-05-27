import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_USERS_POSTS_FAILURE, DELETE_USERS_POSTS_REQUEST, DELETE_USERS_POSTS_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS,  GET_LIKED_POSTS_FAILURE, GET_LIKED_POSTS_REQUEST, GET_LIKED_POSTS_SUCCESS, GET_SAVED_POSTS_FAILURE, GET_SAVED_POSTS_REQUEST, GET_SAVED_POSTS_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_COUNT_FAILURE, LIKE_POST_COUNT_REQUEST, LIKE_POST_COUNT_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVE_POST_FAILURE, SAVE_POST_REQUEST, SAVE_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNSAVE_POST_FAILURE, UNSAVE_POST_REQUEST, UNSAVE_POST_SUCCESS } from "./post.actionType"
import { API_BASE_URL, api } from '../../config/api';

export const createPostAction = (postData) => async (dispatch) => {

    dispatch({ type: CREATE_POST_REQUEST })
    try {
        const { data } = await api.post(`/api/posts`, postData);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
         //console.log("Created Post", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: CREATE_POST_FAILURE, payload: error })
    }
}

export const getAllPostAction = () => async (dispatch) => {

    dispatch({ type: GET_ALL_POST_REQUEST })
    try {
        const { data } = await api.get(`/api/posts`);
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
         //console.log("Get All Post", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error })
    }
}


export const getUsersPostAction = (jwt, userId) => async (dispatch) => {

    dispatch({ type: GET_USERS_POST_REQUEST })
    try {

        const { data } = await api.get(`${API_BASE_URL}/api/posts/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });


        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });



        //console.log("Get Users Post", data);
    } catch (error) {
        //console.log("Error", error);
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error })
    }
}


export const likePostAction = (postId) => async (dispatch) => {

    dispatch({ type: LIKE_POST_REQUEST })
    try {
        const { data } = await api.put(`/api/posts/like/${postId}`);
        dispatch({ type: LIKE_POST_SUCCESS, payload: data });
         //console.log("Liked Post", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: LIKE_POST_FAILURE, payload: error })
    }
}

export const unlikePostAction = (postId) => async (dispatch) => {
    dispatch({ type: UNLIKE_POST_REQUEST });
    try {
        const { data } = await api.delete(`/api/posts/unlike/${postId}`);
        dispatch({ type: UNLIKE_POST_SUCCESS, payload: data });
         //console.log("Unliked Post", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: UNLIKE_POST_FAILURE, payload: error });
    }
};




export const createCommentAction = (reqData) => async (dispatch) => {

    dispatch({ type: CREATE_COMMENT_REQUEST })
    try {
        const { data } = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data);
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
         //console.log("Created Comment", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: CREATE_COMMENT_FAILURE, payload: error })
    }
}



export const getLikedPostCountAction = (jwt, postId) => async (dispatch) => {
    dispatch({ type: LIKE_POST_COUNT_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/posts/likedcount/${postId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({ type: LIKE_POST_COUNT_SUCCESS, payload: data });
         //console.log("post liked count success ----", data); // Payload değerini konsola yazdırın

    } catch (error) {
         //console.log("post liked count failure------", error);
        dispatch({ type: LIKE_POST_COUNT_FAILURE, payload: error });
    }

}


export const savePostAction = (postId) => async (dispatch) => {
    dispatch({ type: SAVE_POST_REQUEST });
    try {
        const { data } = await api.put(`/api/posts/save/${postId}`);
        dispatch({ type: SAVE_POST_SUCCESS, payload: data });
         //console.log('Post saved successfully:', data);
    } catch (error) {
         //console.error('Error saving post:', error);
        dispatch({ type: SAVE_POST_FAILURE, payload: error });
    }
};


export const unsavedPostAction = (postId) => async (dispatch) => {
    dispatch({ type: UNSAVE_POST_REQUEST });
    try {
        const { data } = await api.delete(`/api/posts/unsave/${postId}`);

        dispatch({ type: UNSAVE_POST_SUCCESS, payload: data });
         //console.log('Post unsaved successfully:', data);
    } catch (error) {
         //console.error('Error unsaving post:', error);
        dispatch({ type: UNSAVE_POST_FAILURE, payload: error });
    }
};


export const getSavedPostAction = (jwt,userId) => async (dispatch) => {
    dispatch({ type: GET_SAVED_POSTS_REQUEST });
    try {
        const { data } = await api.get(`/api/posts/saved-post/${userId}`, {

            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_SAVED_POSTS_SUCCESS, payload: data });
         //console.log('Saved posts retrieved successfully----------------:', data);

    } catch (error) {
         //console.error('Error retrieving saved posts ----------------', error);
        dispatch({ type: GET_SAVED_POSTS_FAILURE, payload: error });
    }
}


export const getLikedPostAction = (jwt,userId) => async (dispatch) => {
    dispatch({ type: GET_LIKED_POSTS_REQUEST });
    try {
        const { data } = await api.get(`/api/posts/liked-posts/${userId}`, {

            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_LIKED_POSTS_SUCCESS, payload: data });
         //console.log('LİKED posts retrieved successfully----------------:', data);

    } catch (error) {
         //console.error('Error retrieving saved posts ----------------', error);
        dispatch({ type: GET_LIKED_POSTS_FAILURE, payload: error });
    }
}

export const deleteUserPostAction = (jwt,postId) => async (dispatch) => {
    dispatch({ type: DELETE_USERS_POSTS_REQUEST });
    try {
        const { data } = await api.delete(`${API_BASE_URL}/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: DELETE_USERS_POSTS_SUCCESS, payload: data });
         //console.log("Deleted Post", data);
    } catch (error) {
         //console.log("Error", error);
        dispatch({ type: DELETE_USERS_POSTS_FAILURE, payload: error });
    }
};