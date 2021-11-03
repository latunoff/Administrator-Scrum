import axios from 'axios';
import { SET_CURRENT_BOARD } from './../constants' ;

export function createBoard(data){
    return dispatch => {
        return axios.post('/api/board', data);
    }
}

export function deleteBoard(data){
    //return dispatch => { return axios.post('/api/board/del/', data); }
    return axios.post('/api/board/del/', data);
}

export function setCurrentBoard(board){
    return {
        type: SET_CURRENT_BOARD, 
        board: board
    }
}
