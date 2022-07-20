import {FETCH_ALL_SUGERENCIAS, CREATE_SUGERENCIA, UPDATE_SUGERENCIA, DELETE_SUGERENCIA} from '../constants/actionTypes';
import * as api from '../api';

export const getSugerencias = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getSugerencias(filtros)
        dispatch({type: FETCH_ALL_SUGERENCIAS, payload:data})
        // console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const createSugerencia = async (sugerencia, dispatch) => {
    try{
        const{data} = await api.createSugerencia(sugerencia)
        dispatch({type: CREATE_SUGERENCIA, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

// export const updateObjeciones = async (objecion, dispatch) => {
//     try{
//         const {data} = await api.updateObjecion(objecion)
//         dispatch({type: UPDATE_OBJECION, payload:data})
//     }catch(error){
//         console.log(error)
//     }
// }

export const deleteSugerencias = async (id_sugerencias, dispatch) => {
    try{
        for (let index = 0; index < id_sugerencias.length; index++) {
            const{data} = await api.deleteSugerencias(id_sugerencias[index])
            dispatch({type: DELETE_SUGERENCIA, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}

