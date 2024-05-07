import { GET_FOLLOWERS_COUNT_FAILURE, GET_FOLLOWERS_COUNT_REQUEST, GET_FOLLOWERS_COUNT_SUCCESS, GET_FOLLOWINGS_COUNT_FAILURE, GET_FOLLOWINGS_COUNT_REQUEST, GET_FOLLOWINGS_COUNT_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_POST_FAILURE, GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SET_USER_ID, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from './auth.actionType';

const initalState = {
    jwt: null,
    error: null,
    loading: false,
    postCount: null,
    followingsCount: null,
    followersCount: null,
    userId: null,
    user: null

}
export const authReducer = (state = initalState, action) => {


    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case GET_USER_POST_REQUEST:
        case GET_FOLLOWINGS_COUNT_REQUEST:
        case GET_FOLLOWERS_COUNT_REQUEST:
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

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case GET_USER_POST_FAILURE:
        case GET_FOLLOWINGS_COUNT_FAILURE:
        case GET_FOLLOWERS_COUNT_FAILURE:
            return { ...state, loading: false, error: action.payload };




        default:
            return state;

    }

};