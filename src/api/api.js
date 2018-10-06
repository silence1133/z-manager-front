import axios from 'axios';

let base = '/test';

export const requestLogin = params => { return axios.get(`${base}/login.json`, params).then(res => res.data); };

export const editUser = params => { return axios.post(`${base}/user/update`, params).then(res => res.data); };

export const addUser = params => { return axios.post(`${base}/user/add`, params); };

export const getZUserListPage = params => { return axios.get(`${base}/userList.json`, params); };

export const removeUser = params => { return axios.post(`${base}/user/delete/`+params).then(res => res.data); };

export const getHouseListPage = params => { return axios.get(`${base}/houseList.json`, params); };

export const removeHouse = params => { return axios.post(`${base}/house/delete/`+params).then(res => res.data); };

