import axios from 'axios';

import {
    FETCH_POSTS,
    RECIEVE_POSTS,
    ADD_POST,
    DELETE_POST
} from '../types';

export const recievePosts = posts => {
    return {
        type: RECIEVE_POSTS,
        posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('api/posts')
        .then(response => {dispatch(recievePosts(response.data.posts))});
    }
}