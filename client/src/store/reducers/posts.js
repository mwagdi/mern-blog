import { combineReducers } from 'redux';

import {
    FETCH_POSTS,
    RECIEVE_POSTS,
    ADD_POST,
    DELETE_POST
} from '../types';

const postIds = (state=[],action) => {
    switch(action.type){
        case RECIEVE_POSTS:
            return action.posts.map(post => post._id);
        default:
            return state;
    }
}

const postsById = (state={},action) => {
    switch(action.type){
        case RECIEVE_POSTS:
            return action.posts.reduce((obj,post) => {
                return {
                    ...obj,
                    [post._id]: post
                }
            },{});
        default:
            return state;
    }
}

export default combineReducers({
    postIds,
    postsById
})