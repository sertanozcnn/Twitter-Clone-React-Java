import { GET_ALL_POST_FAILURE } from '../Post/post.actionType';
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_FOLLOWERS_COUNT_FAILURE, GET_FOLLOWERS_COUNT_REQUEST, GET_FOLLOWERS_COUNT_SUCCESS, GET_FOLLOWERS_DETAILS_FAILURE, GET_FOLLOWERS_DETAILS_REQUEST, GET_FOLLOWERS_DETAILS_SUCCESS, GET_FOLLOWINGS_COUNT_FAILURE, GET_FOLLOWINGS_COUNT_REQUEST, GET_FOLLOWINGS_COUNT_SUCCESS, GET_FOLLOWING_DETAILS_FAILURE, GET_FOLLOWING_DETAILS_REQUEST, GET_FOLLOWING_DETAILS_SUCCESS, GET_LAST_FIVE_USERS_REQUEST, GET_LAST_FIVE_USERS_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_POST_FAILURE, GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SET_USER_ID, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS, USER_FOLLOWING_FAILURE, USER_FOLLOWING_REQUEST, USER_FOLLOWING_SUCCESS, USER_UNFOLLOWING_FAILURE, USER_UNFOLLOWING_REQUEST, USER_UNFOLLOWING_SUCCESS } from './auth.actionType';

const initalState = {
    jwt: null,
    error: null,
    loading: false,
    postCount: null,
    followingsCount: null,
    followersCount: null,
    userId: null,
    user: null,
    usersSearch: [],
    followingDetails: [],
    followersDetails: [],
    follow: null,
    unfollow: null,
    lastFiveUsers: null,
    popularUser: null

}
export const authReducer = (state = initalState, action) => {


    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case GET_USER_POST_REQUEST:
        case GET_FOLLOWINGS_COUNT_REQUEST:
        case GET_FOLLOWERS_COUNT_REQUEST:
        case LOGOUT_REQUEST:
        case GET_FOLLOWING_DETAILS_REQUEST:
        case GET_FOLLOWERS_DETAILS_REQUEST:
        case USER_FOLLOWING_REQUEST:
        case USER_UNFOLLOWING_REQUEST:
        case GET_ALL_USERS_REQUEST:
        case GET_LAST_FIVE_USERS_REQUEST:
        case SEARCH_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:

            return { ...state, user: action.payload, error: null, loading: false };


        case GET_USER_POST_SUCCESS:
            return {
                ...state,
                postCount: action.payload, // Update postCount field
                error: null,
                loading: false,
            };

        case GET_FOLLOWINGS_COUNT_SUCCESS:
            return {
                ...state,
                followingsCount: action.payload,
                error: null,
                loading: false,
            };

        case GET_FOLLOWERS_COUNT_SUCCESS:
            return {
                ...state,
                followersCount: action.payload,
                error: null,
                loading: false,
            };

        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null };

        case LOGOUT_SUCCESS:
            return { ...state, jwt: null, loading: false, error: null };


        case GET_FOLLOWING_DETAILS_SUCCESS:
            return {
                ...state,
                followingDetails: action.payload,
                loading: false,
                error: null,
            };

        case GET_FOLLOWERS_DETAILS_SUCCESS:
            return {
                ...state,
                followersDetails: action.payload,
                loading: false,
                error: null,
            };

        case USER_FOLLOWING_SUCCESS:
            return {
                ...state,
                follow: action.payload,
                loading: false,
                error: null,
            };

        case USER_UNFOLLOWING_SUCCESS:
            return {
                ...state,
                unfollow: action.payload,
                loading: false,
                error: null,
            };

        case GET_ALL_USERS_SUCCESS:
            return { ...state, popularUser: action.payload, error: null, loading: false };

        case GET_LAST_FIVE_USERS_SUCCESS:
            return { ...state, lastFiveUsers: action.payload, error: null, loading: false };
        case SEARCH_USER_SUCCESS:
            return { ...state, usersSearch: action.payload, loading: false, error: null };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case GET_USER_POST_FAILURE:
        case GET_FOLLOWINGS_COUNT_FAILURE:
        case GET_FOLLOWERS_COUNT_FAILURE:
        case GET_PROFILE_FAILURE:
        case LOGOUT_FAILURE:
        case GET_FOLLOWING_DETAILS_FAILURE:
        case GET_FOLLOWERS_DETAILS_FAILURE:
        case USER_FOLLOWING_FAILURE:
        case USER_UNFOLLOWING_FAILURE:
        case GET_ALL_USERS_FAILURE:
        case GET_ALL_POST_FAILURE:
        case SEARCH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };






        default:
            return state;

    }

};