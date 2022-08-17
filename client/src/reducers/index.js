import { combineReducers } from 'redux';
import objeciones from './DReducers/objeciones';
import sugerencias from './DReducers/sugerencias';
import respuestas from './DReducers/respuestas';


export default combineReducers({
    objeciones, sugerencias, respuestas
})