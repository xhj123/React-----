import React, {useEffect, useState} from "react";
import {MusicState,ConnectRC,connect} from "umi";
import './channel.less'

interface ChannelProps {
  music:MusicState;
  closeChannel:Function;
  yVal:string;
}

const Channel:ConnectRC<ChannelProps> = ({yVal,music,closeChannel,dispatch}) => {
  // console.log(yVal)
  const {groupData,filterGroup2,filterGroup3} = music
  const [currentG1,setCurrentG1] = useState(0)
  const [currentG2,setCurrentG2] = useState(0)
  useEffect(()=>{
    if(dispatch) {
      dispatch({type:'music/getgroups'})
    }
  },[])

  return (
    <div className='channelModel' style={{transform:yVal}}>
      <div className='musicType'>
        {groupData.group1.map((item,index) => (
          <span className={`${currentG1 === index ? 'borderBottom': ''}`} key={item.id}
          onClick={()=>{
            setCurrentG1(index)
            setCurrentG2(0)
            if(dispatch) {
              dispatch({type:'music/filterGroup2',payload:item.id})
            }
          }}>{item.name}</span>
        ))}
        <div className='close' onClick={()=>{
          closeChannel()
        }}></div>
      </div>
      <div className='groupAll'>
        <div className='groupLeft'>
          {filterGroup2.map((item,index) => (
            <span className={`${currentG2 === index ? 'selectIndex': ''}`} key={index}
            onClick={() =>{
              setCurrentG2(index)
              if(dispatch) {
                dispatch({type:'music/filterGroup3',payload:index})
              }
            }}>{item.name}</span>
          ))}
        </div>
        <div className='groupRight'>
          {filterGroup3.map((item,index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default connect(({music}:{music:MusicState}) => ({music}))(Channel)
