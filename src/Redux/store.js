import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from 'redux-thunk';

import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { reelsReducer } from "./Reels/reels.reducer";
const rootReducers = combineReducers({
    auth: authReducer,
    post:postReducer,
    reels:reelsReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
