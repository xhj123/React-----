import axios from 'axios'
import {getDvaApp} from 'umi';

const server = axios.create({
  baseURL:'/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 白名单列表,请求下面的url时不需要判断是否登录
const WHITE_LIST = [
  '/user/getUserDetail',
  '/music/getRecommendMusic',
  '/music/getGroupMusic'
]

// 请求拦截
server.interceptors.request.use(async req => {
  if (WHITE_LIST.includes(req.url as string)) {
    return req
  }
  let state = await getDvaApp()._store.dispatch({type:'user/getState'})
  if(!state.user.data.tokenExpired) {
    location.href = '//music.163.com/m/login?redirect_url=https%3A%2F%2Fmusic.163.com%2Fst%2Fdifm'
  }
  return req
})

// 响应拦截
server.interceptors.response.use(res => {
  let {status,data} = res

  if(status !== 200) {
    return Promise.reject('error')
  }
  return data
},(err) => {
  return Promise.reject(err)
})

export default server
