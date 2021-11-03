import axios from 'axios';

export function createList(data){
    return dispatch => {
        return axios.post('/api/list', data);
    }
}

export function deleteList(id){
    return axios.delete('/api/list/'+id._id);
}

export function updateList(id, data){
    return axios.patch('/api/list/'+id, data);
}