import axios from 'axios';

export function createCard(data){
    return dispatch => {
        // console.log('createCard', data);
        return axios.post('/api/card', data);
    }
}

export function deleteCard(id){
    //return dispatch => { return axios.delete('/api/card/'+id, data) }
    return axios.delete('/api/card/'+id._id);
}

export function updateCard(id, data){
    // return dispatch => 
    {
        return axios.patch('/api/card/'+id, data)
    }
}