import axios from 'axios'
import { useState, useEffect } from 'react'
//const baseUrl = 'http://localhost:3003/api/blogs'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = value => {
    setValue(value)
  }

  const  inputProps = {
              type,
              value,
              onChange,
 }

  return {
    inputProps,
    reset
  
  }
           
}



export const useResource = (baseUrl) => {
  let token = null

  const setToken = newToken => {
    token = `bearer ${ newToken }`
}
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    const response = await axios(baseUrl)
    setResources(response.data)
    console.log(response.data)
  }
    fetchData()
  }, [baseUrl]) 

  
  const resetToken = () => {
      token = null
  }
  const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }
  
  const create = async (newObject) => {
      const config = {
          headers: { Authorization: token },
      }

      const response = await axios.post(baseUrl, newObject, config)
      setResources(resources.concat(response.data))
  }

  const update = async (id, newObject) => {
      const response = await axios.put(`${baseUrl}/${id}`, newObject)
      setResources(resources.map(data => data.id === data ? response.data : data))
  }

  const remove = (id) => {
      const config = {
          headers: { Authorization: token }
      }

      axios.delete(`${baseUrl}/${id}`, config)
      setResources(resources.filter(data => data.id !== id))
  }
/*
  const service = {
    setToken,
    resetToken,
    create,
    update,
    remove,
    getAll
}
*/
  return [
      resources,
      {
        setToken,
        resetToken,
        create,
        update,
        remove,
        getAll
    }
     
  ]
}