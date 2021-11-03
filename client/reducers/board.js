import { SET_CURRENT_BOARD } from './../constants' ;
import isEmpty from 'lodash/isEmpty' ;

const initialState = {
    currentBoard: {}
}

export default (state = initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_BOARD:
            return {
                currentBoard: action.board
            }
        default: return state;
    }
}
