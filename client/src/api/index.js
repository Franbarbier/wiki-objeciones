import axios from 'axios';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = ''

// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://wiki-objs.herokuapp.com/';


const url_objeciones = ENDPOINT+'objeciones'
export const getObjeciones = (filtros) => axios.get(url_objeciones, {...filtros, headers});
export const createObjecion = (objecion) => axios.post(url_objeciones, objecion );
export const deleteObjeciones = (id) => axios.delete(`${url_objeciones}/${id}`, {headers});
export const updateObjecion = (objecion) => axios.patch(`${url_objeciones}/`, objecion, {headers});
// export const getOrdenesCliente = (id_cliente) => axios.get(`${url_clientes}/ordenes/${id_cliente}`, {headers});


