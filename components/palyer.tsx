import React, {useRef, MutableRefObject, useState} from "react";
import { MusicState, ConnectRC, connect } from 'umi'
import il8n from "../il8n";
import './player.less'

interface PlayProps {
  music: MusicState;
  openChannel:() => void
}

type SecondToTime = (x:number) => string

const Player:ConnectRC<PlayProps> = ({music,dispatch,openChannel}) => {
  // console.log(musicItem)
  const {
    musicData
  } = music
  // console.log(musicData)
  const audioRef:MutableRefObject<any> = useRef()
  const [currentTime,setCurrentTime] = useState(0)
  const [duration,setDuration] = useState(0)
  const [pause,setPause] = useState(true)

  let secondToTime:SecondToTime
  secondToTime = (seconds:number) => {
    let min = Math.floor/*向下取整*/(seconds / 60)
    let sec = Math.floor(seconds - 60*min)
    return '0' + min + ':' + (sec < 10 ? '0' + sec : sec)
  }

  return (
    <div className='control'>
      <div className='control--progress'>
        <div className='control--progress--start'>{secondToTime(currentTime)}</div>
        <div className='control--progress--line'>
          <div style={{background:'#fff',width:(currentTime / duration)*100 + '%',height:'2px'}}></div>
        </div>
        <div className='control--progress--end'>{secondToTime(duration)}</div>
      </div>
      <div className='control-button'>
        <div className='littleTip' onClick={e=>{
          if(dispatch) {
            dispatch({type:'music/collect',payload: musicData.id})
          }
        }}>
          <span className='collectTip'></span>
          <span>{il8n('music')['收藏频道']}</span>
        </div>
        <span className={`audioPause ${pause ? 'audioPlay':''}`} onClick={(e) => {
          let audio = audioRef.current
          // console.log(audio)
          if(audio.paused) {
            audioRef.current.play()
          } else {
            audioRef.current.pause()
          }
          setPause(audio.paused)
        }}></span>
        <div className='littleTip' onClick={()=>{
          openChannel()
        }}>
          <span className='moreTip'></span>
          <span>{il8n('music')['更多频道']}</span>
        </div>
      </div>
      <audio src={"http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_407610&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3"} ref={audioRef} preload={'auto'}
        onTimeUpdate={e=>{
          setCurrentTime(audioRef.current.currentTime)
          if(audioRef.current.currentTime === audioRef.current.duration) {
            setPause(true)
          }
        }}
        onCanPlay={e=>{
          setDuration(parseInt(audioRef.current.duration))
        }}
      ></audio>
    </div>
  )
}


export default connect(({music}: {music:MusicState }) => ({
  music
}))(Player)

