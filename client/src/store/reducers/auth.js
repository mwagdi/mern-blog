import { 
    LOGGING_IN,
    LOGIN,
    LOGOUT
} from '../types';

const initialState = {
    user: {},
    authenticated: false
}

export default (state = initialState,action) => {
    switch(action.type){
        case LOGIN:
            return {
                user: action.user,
                authenticated: true
            }
        case LOGOUT:
            return {
                user: {},
                authenticated: false
            }
        default:
            return state;
    }
}