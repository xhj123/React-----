import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getUserDetail } from '../../api/user'
import {setCountry} from '../../il8n/index'

export interface UserState {
  data: object
}

export  interface UserType {
  namespace: 'user';
  state: UserState;
  effects: {
    query: Effect;
    getState: Effect;
  };
  reducers: {
    fetch: ImmerReducer<UserState>;
  };
  subscriptions: { };
}

const UserInfo: UserType = {
  namespace: 'user',
  state: {
    data:{}
  },
  // 处理异步操作和业务逻辑
  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(getUserDetail,payload)
      setCountry(res.data.country)
      yield put({type:'fetch',data:res.data})
    },
    *getState({},{select}) {
      const user = yield select((state:object) => state)
      return user
    }
  },
  // 处理同步操作
  reducers: {
    // 启用 immer 之后
    fetch(state,{data}) {
      return {...state,data}
    }
  },
  // 订阅数据
  subscriptions: {}
}

export default UserInfo
