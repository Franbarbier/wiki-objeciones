import {FETCH_ALL_RESPUESTAS, CREATE_RESPUESTA, UPDATE_RESPUESTA, DELETE_RESPUESTA} from '../constants/actionTypes';
import * as api from '../api';

export const getRespuestas = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getRespuestas(filtros)
        dispatch({type: FETCH_ALL_RESPUESTAS, payload:data})
        // console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const createRespuesta = async (respuesta, dispatch) => {
    try{
        const{data} = await api.createRespuesta(respuesta)
        dispatch({type: CREATE_RESPUESTA, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

export const updateRespuestas = async (respuesta, dispatch) => {
    try{
        const {data} = await api.updateRespuesta(respuesta)
        dispatch({type: UPDATE_RESPUESTA, payload:data})
    }catch(error){
        console.log(error)
    }
}

export const deleteRespuestas = async (id_respuestas, dispatch) => {
    try{
        for (let index = 0; index < id_respuestas.length; index++) {
            const{data} = await api.deleteRespuestas(id_respuestas[index])
            dispatch({type: DELETE_RESPUESTA, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}

