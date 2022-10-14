import { combineReducers } from 'redux';
import objeciones from './DReducers/objeciones';
import sugerencias from './DReducers/sugerencias';
import respuestas from './DReducers/respuestas';
import users from './DReducers/users';


export default combineReducers({
    objeciones, sugerencias, respuestas, users
})
