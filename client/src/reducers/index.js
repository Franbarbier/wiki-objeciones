import { combineReducers } from 'redux';
import objeciones from './DReducers/objeciones';
import sugerencias from './DReducers/sugerencias';


export default combineReducers({
    objeciones, sugerencias
})