import server from '../config/request'


export const getUserDetail = (params:object) => server.get('/user/getUserDetail',params)
