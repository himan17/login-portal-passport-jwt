import {createStore} from 'redux';

const initialState = {
    user : null
};

const reducer = (state = initialState, action) => {
    if(action.type === 'login'){
        localStorage.setItem('JWT_PAYLOAD', action.token);
        localStorage.setItem('fullName', action.user.fullName);
        localStorage.setItem('id', action.user._id)
        
        return {
            ...state,
            user: action.user
        }
    }
}

const store = createStore(reducer);

export default store;