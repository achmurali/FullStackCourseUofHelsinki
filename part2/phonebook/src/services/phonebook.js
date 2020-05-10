import axios from 'axios'

const baseUrl = '/api/phonebook'

const getAll = () => {
    return axios.get(baseUrl)
                .then(response => response.data)
                .catch(error => alert(error))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.status)  
  }

const update = newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`,newObject)
  return request.then(response => response.data)
}

export default { getAll, create, deletePerson,update }