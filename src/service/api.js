import axios from 'axios';
 
//Cria os metodos do axios para utilizar requests
const api = axios.create({
 baseURL: 'https://api.themoviedb.org/3'
});
 
export default api;