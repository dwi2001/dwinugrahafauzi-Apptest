import axios from 'axios'

export const getData = () => {
    return {
        type: 'GET_DATA',
        payload: axios.get(`https://simple-contact-crud.herokuapp.com/contact`)
    }
}