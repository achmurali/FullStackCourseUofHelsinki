import axios from 'axios'

const getAllUsers = async () => {
    const response = await axios.get('api/users')
    return response.data
}

export default {getAllUsers}