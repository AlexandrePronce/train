import axios from "axios"



const baseUrl = "//localhost:3001/unicorns"

const getAll = () => axios.get(baseUrl).then(response => response.data)
//const getOneById = (id) => axios.get(`${baseUrl}/${id}`).then(response => response.data);

const createUnicorn= (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
}


const unicornsAPI = {
  getAll ,
  createUnicorn//,
  //getOneById
  //create
}

export default unicornsAPI
