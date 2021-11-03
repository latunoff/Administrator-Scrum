import { combineReducers } from 'redux' ;
import flashMessages from './flash.messages' ;
import auth from './auth' ;
import board from './board' ;


export default combineReducers({
    flashMessages, 
    auth, 
    board
})