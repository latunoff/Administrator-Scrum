import axios from 'axios';

export function createList(data){
    return dispatch => {
        return axios.post('/api/list', data);
    }
}
