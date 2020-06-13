import React, {useEffect, useState} from "react";
import { IRouteComponentProps, UserState, ConnectRC, connect } from 'umi'
import './index.less'

interface LayoutProps {
  children:IRouteComponentProps;
  user: UserState;
}

const Init = () => {
  return (
    <div className='loading'>
    </div>
  )
}

const Layout:ConnectRC<LayoutProps>  = ({user,children,dispatch}) => {
  // console.log(user)
  const [loading,setloading] = useState(true)
  useEffect(() => {
    // 初始化获取用户数据
    dispatch ? dispatch({type:'user/query'}) : ''
    setTimeout(()=>{
      // debugger
      setloading(false)
    },1000)
  },[])

  return (
    <div>
      {loading ? <Init /> : children}
    </div>
  )
}

export default connect(({user}:{user:UserState}) => ({user}))(Layout)
