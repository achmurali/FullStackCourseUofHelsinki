import axios from 'axios'
import {getId} from '../reducers/anecdoteReducer'

const baseUrl = "http://localhost:3003/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const Add = async (data) => {
    const response = await axios.post(baseUrl,data)
    return response.data
}

const Update = async (data) => {
    const response = await axios.put(`${baseUrl}/${data.id}`,data)
    return response.data
}

export default {getAll,Add,Update}