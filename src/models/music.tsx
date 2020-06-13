import {Effect, ImmerReducer} from "umi";
import { getRecommendMusic,getCollectMusicById,getGroupMusic } from '../../api/music'

export interface musicDataType {
  name:string,
  author:string,
  background:string,
  type:string,
  alias:string,
  id:number
}

export interface group1 {
  name:string,
  id:number
}

interface group2 {
  name:string,
  id:number,
  group1Id:number
}

interface group3 {
  name:string,
  group2Id:number
}

interface groupDataType {
  group1:Array<group1>;
  group2:Array<group2>;
  group3:Array<group3>
}

export interface MusicState {
  musicData: musicDataType;
  groupData:groupDataType;
  filterGroup2:Array<group2>;
  filterGroup3:Array<group3>;
}

export  interface MusicType {
  namespace: 'music';
  state: MusicState;
  effects: {
    query: Effect;
    collect: Effect;
    getgroups:Effect;
    filterGroup2:Effect;
    filterGroup3:Effect;
  };
  reducers: {
    fetch: ImmerReducer<MusicState>;
    setgroups:ImmerReducer<MusicState>;
    filterTwo:ImmerReducer<MusicState>;
    filterThree:ImmerReducer<MusicState>;
  }
}

const MusicInfo: MusicType = {
  namespace: 'music',
  state: {
    musicData: {
      name:'',
      author:'',
      background:'',
      type:'',
      alias:'',
      id:0
    },
    groupData:{
      group1:[],
      group2:[],
      group3:[]
    },
    filterGroup2:[],
    filterGroup3:[]
  },
  // 处理异步操作和业务逻辑
  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(getRecommendMusic,payload/*调用异步方法时传递的参数,比如http请求参数*/)
      yield put({type: 'fetch', musicData: res.data});
    },
    *collect({ payload }, { call, put }) {
      const res = yield call(getCollectMusicById,payload)
    },
    *getgroups(payload, { call, put }) {
      const res = yield call(getGroupMusic,payload)
      const filterGroup2 = res.data.group2.filter((item:group2) => item.id === 1)
      const filterGroup3 = res.data.group3.filter((item:group3) => item.group2Id === filterGroup2[0].group1Id)
      yield put({type: 'setgroups', groupData: res.data,filterGroup2,filterGroup3});
    },
    // 过滤数据
    *filterGroup2({ payload },{put,select}) {
      const group = yield select((state:object) => state)
      let groupData = group.music.groupData
      let filterGroup2 = groupData.group2.filter((item:group2) => item.id === payload)
      let filterGroup3 = groupData.group3.filter((item:group3) => item.group2Id === filterGroup2[0].group1Id)
      yield put({type: 'filterTwo', filterGroup2,filterGroup3});
      // console.log(group)
    },
    *filterGroup3({payload},{put,select}) {
      const group = yield select((state:object) => state)
      let groupData = group.music.groupData
      let filterGroup2 = group.music.filterGroup2
      let filterGroup3 = groupData.group3.filter((item:group3) => item.group2Id === filterGroup2[payload].group1Id)
      yield put({type: 'filterThree', filterGroup3});
    }
  },
  // 处理同步操作
  reducers: {
    // 启用 immer 之后
    fetch(state, {musicData}) {
      return {...state,musicData}
    },
    setgroups(state,{groupData,filterGroup2,filterGroup3}) {
      return {...state,groupData,filterGroup2,filterGroup3}
    },
    filterTwo(state,{filterGroup2,filterGroup3}) {
      return {...state,filterGroup2,filterGroup3}
    },
    filterThree(state,{filterGroup3}) {
      return {...state,filterGroup3}
    }
  }
}

export default MusicInfo
