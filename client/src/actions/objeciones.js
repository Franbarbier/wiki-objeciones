import {FETCH_ALL_OBJECIONES, CREATE_OBJECION, UPDATE_OBJECION, DELETE_OBJECION} from '../constants/actionTypes';
import * as api from '../api';

export const getObjeciones = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getObjeciones(filtros)
        dispatch({type: FETCH_ALL_OBJECIONES, payload:data})
        // console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const createObjecion = async (objecion, dispatch) => {
    try{
        const{data} = await api.createObjecion(objecion)
        dispatch({type: CREATE_OBJECION, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

export const updateObjeciones = async (objeciones, dispatch) => {
    // try{
    //     const {data} = await api.updateCliente(cliente)
    //     dispatch({type: UPDATE_CLIENTE, payload:data})
    // }catch(error){
    //     console.log(error)
    // }
}

export const deleteObjeciones = async (id_objeciones, dispatch) => {
    try{
        for (let index = 0; index < id_objeciones.length; index++) {
            const{data} = await api.deleteObjeciones(id_objeciones[index])
            dispatch({type: DELETE_OBJECION, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}

