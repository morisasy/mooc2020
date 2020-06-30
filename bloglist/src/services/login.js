import axios from 'axios'
//const baseUrl = '/api/login'
//const baseUrl = 'http://localhost:3003/api/login'
//https://warm-mesa-44071.herokuapp.com/api/users

const baseUrl = 'https://warm-mesa-44071.herokuapp.com/api/users'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }