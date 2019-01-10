import { SIGN_IN, LOAD_USER } from './constans';

export const onSignedIn=()=>{
    return{
        action: SIGN_IN,
        payload: ''
    }
}

export const loadUser=(user:any)=>{
    return{
        action: LOAD_USER,
        payload:{
            id: user.id,
            name: user.name,
        }
    }
}