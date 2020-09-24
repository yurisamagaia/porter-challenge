import { combineReducers } from 'redux';
import { SAVE_DATA } from '../actions'
 
const INITIAL_DATA = {
 imagesUrl: null,
}
 
//Função que retorna o que foi salvo no SAVE_DATA
function dataReducer(state = INITIAL_DATA, action) {
 switch(action.type){
   case SAVE_DATA:
     return Object.assign({}, state, {
       imagesUrl: action.data
     })
   default:
     return state
 }
}
 
const rootReducer = combineReducers({ dataState: dataReducer })
 
export default rootReducer