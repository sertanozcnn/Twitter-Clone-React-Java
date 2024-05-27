import { CREATE_REELS_FAILURE, CREATE_REELS_REQUEST, CREATE_REELS_SUCCESS, GET_USERS_ALL_REELS_FAILURE, GET_USERS_ALL_REELS_REQUEST, GET_USERS_ALL_REELS_SUCCESS, GET_USERS_REELS_FAILURE, GET_USERS_REELS_REQUEST, GET_USERS_REELS_SUCCESS } from "./reels.actionType";



const initalState = {
    reel: null,
    reels: [],
    loading: false,
    error: null,
    viewReels: null,
    allReels:null,
}

export const reelsReducer = (state = initalState, action) => {

    switch (action.type) {


        case CREATE_REELS_REQUEST:
        case GET_USERS_REELS_REQUEST:
        case GET_USERS_ALL_REELS_REQUEST:
            return { ...state, error: null, loading: false };


        case CREATE_REELS_SUCCESS:
            return {
                ...state,
                reel: action.payload,
                reels: [action.payload, ...state.reels],
                loading: false,
                error: null
            };


        case GET_USERS_REELS_SUCCESS:
            return {
                ...state,
                viewReels: action.payload, // Update postCount field
                error: null,
                loading: false,
            };

        case GET_USERS_ALL_REELS_SUCCESS:
            return {
                ...state,
                allReels: action.payload, // Update postCount field
                error: null,
                loading: false,
            };




        case CREATE_REELS_FAILURE:
        case GET_USERS_REELS_FAILURE:
        case GET_USERS_ALL_REELS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }



        default:
            return state;
    }

}