import api from '../../service/api'
import { API_KEY } from '../../service/api_key'
 
export const SAVE_DATA = 'SAVE_DATA'
 
//Função para persistir no SAVE_DATA os dados que retornaram da request
function saveData(response) {
 return {
   type: SAVE_DATA,
   data: response
 }
}
 
//Função que faz a request e chama o saveData para salvar o response
export function fetchUrlImages (){
 return dispatch => {
   api.get('/configuration&api_key='+API_KEY)
     .then(res => {
       dispatch(saveData(res.images.secure_base_url))
     })
     .catch(() => {
       dispatch(saveData('https://image.tmdb.org/t/p/w500/'))
     })
 }
}
