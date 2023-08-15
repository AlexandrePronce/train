import axios from "axios"



const baseUrl = "//localhost:3001/sales"

const getAll = () => axios.get(baseUrl).then(response => response.data)
const deleteOneById = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data);
const createSale = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
}




const salesAPI = {
  getAll ,
  deleteOneById,
  createSale
  //create
}

export default salesAPI
