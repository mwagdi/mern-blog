import axios from 'axios';

import {
    LOGGING_IN,
    LOGIN,
    LOGOUT
} from '../types';

export const sendAuth = (email,password) => {
    return dispatch => {
        dispatch({
            type: LOGGING_IN
        });
        axios.post("api/users/login",{ email,password })
        .then(response => {
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("expiry_date",(Date.now() + 31556926000));
            axios.defaults.headers["Authorization"] = response.data.token;
            dispatch(login());
        })
    }
}

export const login = () => {
    return dispatch => {
        axios.get("api/users/current")
        .then(response => {
            dispatch({
                type: LOGIN,
                user: response.data
            })   
        })
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}