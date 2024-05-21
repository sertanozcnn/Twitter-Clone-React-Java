import { GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS } from "../Auth/auth.actionType";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_COMMENTS_FAILURE, GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_SAVED_POSTS_FAILURE, GET_SAVED_POSTS_REQUEST, GET_SAVED_POSTS_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_SUCCESS, LIKE_POST_COUNT_FAILURE, LIKE_POST_COUNT_REQUEST, LIKE_POST_COUNT_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVE_POST_FAILURE, SAVE_POST_REQUEST, SAVE_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNSAVE_POST_FAILURE, UNSAVE_POST_REQUEST, UNSAVE_POST_SUCCESS } from "./post.actionType"

const initalState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
    comments: [],
    likePostCount: null,
    newComment: null,
    savedPost: null


}

export const postReducer = (state = initalState, action) => {

    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case GET_USER_POST_REQUEST:
        case UNLIKE_POST_REQUEST:
        case LIKE_POST_COUNT_REQUEST:
        case SAVE_POST_REQUEST:
        case UNSAVE_POST_REQUEST:
        case GET_SAVED_POSTS_REQUEST:
            return { ...state, error: null, loading: false };


        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            };
        case GET_ALL_POST_SUCCESS:
            // Assume action.payload contains posts and comments
            return {
                ...state,
                posts: action.payload,
                comments: action.payload.comments,
                loading: false,
                error: null
            };

        case LIKE_POST_COUNT_SUCCESS:
            return {
                ...state,
                likePostCount: action.payload, // Burada likedCount alanını güncelliyoruz
                error: null,
                loading: false,
            };

        case GET_USERS_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload, // Update postCount field
                error: null,
                loading: false,
            };


        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment: action.payload,
                loading: false,
                error: null
            };



        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) => item.id === action.payload.id
                    ? action.payload : item),
                loading: false,
                error: null
            };




        case UNLIKE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
                loading: false,
                error: null
            };

        case SAVE_POST_SUCCESS:
            return {
                ...state,
                savedPost: action.payload,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return action.payload;
                    }
                    return post;
                }),

                loading: false,
                error: null
            };


        case UNSAVE_POST_SUCCESS:
            return {
                ...state,
                savedPost: action.payload,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return action.payload;
                    }
                    return post;
                }), 
                loading: false,
                error: null
            };

        case GET_SAVED_POSTS_SUCCESS: // Eklendi
            return {
                ...state,
                savedPosts: action.payload,
                
                loading: false,
                error: null
            };






        case CREATE_COMMENT_FAILURE:
        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
        case UNLIKE_POST_FAILURE:
        case LIKE_POST_COUNT_FAILURE:
        case SAVE_POST_FAILURE:
        case UNSAVE_POST_FAILURE:
        case GET_SAVED_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;

    }

}