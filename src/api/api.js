
import axios from 'axios';

let base = '/api';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const editUser = params => { return axios.post(`${base}/user/update`, params).then(res => res.data); };

export const addUser = params => { return axios.post(`${base}/user/add`, params); };

export const getZUserListPage = params => { return axios.get(`${base}/user/get`, { params: params }); };

export const removeUser = params => { return axios.post(`${base}/user/delete/`+params).then(res => res.data); };


/**
 *  门面相关
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getHouseListPage = params => { return axios.get(`${base}/house/list`, { params: params }); };

export const removeHouse = params => { return axios.post(`${base}/house/delete/`+params).then(res => res.data); };

export const addHouse = params => { return axios.post(`${base}/house/add`,params).then(res => res.data); };

export const loadHouseList = () => { return axios.get(`${base}/house/list/available`).then(res => res.data); };


/**
 * 商户相关
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getMerchantListPage = params => { return axios.get(`${base}/merchant/list`, { params: params }); };

export const addMerchant = params => { return axios.post(`${base}/merchant/add`,params).then(res => res.data); };

export const removeMerchant = params => { return axios.post(`${base}/merchant/delete/`+params).then(res => res.data); };


/**
 * 合同相关
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 */
export const addContract = params => { return axios.post(`${base}/contract/add`,params).then(res => res.data); };

export const getContractListPage = params => { return axios.get(`${base}/contract/list`, { params: params }); };

export const addWaterMeter = params => { return axios.post(`${base}/waterMeter/add`,params).then(res => res.data); };

export const addElectricMeter = params => { return axios.post(`${base}/electricMeter/add`,params).then(res => res.data); };
