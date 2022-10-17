import {DELETE_USER, FETCH_ALL_USERS, LOGIN, UPDATE_USER, VERIFY_USER} from '../constants/actionTypes';
import * as api from '../api';

// export const login = (user) => async (dispatch) => {
//     try{
//         const{data} = await api.login(user)
//         dispatch({type: LOGIN, payload:data})
//     }catch(error){
//         console.log(error)
//     }

// }

// export const logout = () => {
    
//     localStorage.setItem('token', "")
//     localStorage.setItem('user', "")
//     window.location.href = "/login"

// }

export const createNewUser = async (user, dispatch) => {
    try{
        const{data} = await api.createUser(user)
        // dispatch({type: CREATE_USER, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}
export const updateUser = async (user, id, dispatch) => {
    try{
        const updateData = {user, id}
        const {data} = await api.updateUser(updateData)
        // dispatch({type: UPDATE_USER, payload:data})
        console.log(data)
    }catch(error){
        console.log(error)
    }
}

export const getUsers = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getUsers(filtros)
        dispatch({type: FETCH_ALL_USERS, payload:data})
        console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const deleteUser = async (id_user, dispatch) => {
    try{
        
            const{data} = await api.deleteUser(id_user)
            dispatch({type: DELETE_USER, payload:data})
        
    }catch(error){
        console.log(error)
    }
}
