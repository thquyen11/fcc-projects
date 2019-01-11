import { SIGN_IN, LOAD_USER, REGISTER, OPEN_PROFILE, UPDATE_PROFILE } from './constans';

export const onSignedIn=()=>{
    return{
        type: SIGN_IN,
        payload: ''
    }
}

export const onRegistered=()=>{
    return{
        type: REGISTER,
        payload: ''
    }
}

export const loadUser=(user:any)=>{
    return{
        type: LOAD_USER,
        payload:{
            id: user.id,
            name: user.name,
        }
    }
}

export const openProfile=()=>{
    return{
        action: OPEN_PROFILE,
        payload: ''
    }
}

export const updateProfile=(profile:any)=>{
    return{
        action: UPDATE_PROFILE,
        payload: profile
    }
}