import { SIGN_IN, LOAD_USER } from './constans';

const initialAuthenticate={
    isSignedIn: false,
    user:{
        id: 0,
        name: '',
    }
}

export const Authenticate=(state=initialAuthenticate, action:any={})=>{
    switch(action.type){
        case SIGN_IN:
            return Object.assign({}, state, { isSignedIn: true });
        case LOAD_USER:
            return Object.assign({}, state, { user: action.payload });
        default:
            return state;
    }
}