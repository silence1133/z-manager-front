import axios from 'axios';

let base = '/api';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const editUser = params => { return axios.post(`${base}/user/update`, params).then(res => res.data); };

export const addUser = params => { return axios.post(`${base}/user/add`, params); };

export const getZUserListPage = params => { return axios.get(`${base}/user/get`, params); };

export const removeUser = params => { return axios.post(`${base}/user/delete/`+params).then(res => res.data); };
