import React, {useEffect, useState} from 'react';
import { MusicState, connect, ConnectRC } from 'umi'
import Player from '../../components/palyer'
import Channel from '../../components/Channel'
import './index.less'

interface pageProps {
  music: MusicState
}

const PageIndex:ConnectRC<pageProps> = ({music,dispatch}) => {
  const {
    musicData
  } = music
  // console.log(music)
  useEffect(()=>{
    if(dispatch) {
      dispatch({type:'music/query',payload:{}})
    }
  },[])

  const [isChannel,setChannel] = useState<string>('translateY(0)')
  return (
    <div className='page'>
      <div className='header'>
        <div className='header--info'>
          <span>{musicData.name}</span>
          <span>{musicData.author}</span>
        </div>
        <a className='header--share'/>
      </div>
      <div className='content'>
        <img src={musicData.background}/>
      </div>
      <div className='desc'>
        <p>{musicData.type}</p>
        <p>{musicData.alias}</p>
      </div>
      <Player  openChannel={() => {
        setChannel('translateY(-10rem)')
      }}/>
      {isChannel && <Channel yVal={isChannel} closeChannel={()=>{
        setChannel('translateY(0)')
      }}/>}
    </div>
  )
}

export default connect(({ music }: { music: MusicState }) => ({
  music,
}))(PageIndex);
