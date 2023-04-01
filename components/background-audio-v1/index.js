/*
 * @Author: guoxin
 * @Date: 2023-03-30 16:30:37
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-01 21:01:03
 * @Description: 播放音乐后底部状态栏
 */
// components/background-audio-v1/index.js
import {getSongUrl} from '../../api/api-music'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    playing: app.globalData.isPlaying,
    songUrl:null,
    songInfo:app.globalData.playingSongInfo,
    musicStatus:true,
    backgroundAudio:null, //音频上下文
  },
  created(){
    const backgroundAudio = app.globalData.backgroundAudioContext
    this.setData({
      backgroundAudio:backgroundAudio
      // playing:app.globalData.isPlaying
    })
    backgroundAudio.onPlay(()=>{
      this.playMusic()
    })
    backgroundAudio.onPause(()=>{
      this.pauseMusic()
    })
  },
  attached(){
    this.getSongUrl()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getSongUrl(){
      this.setData({
        songInfo:app.globalData.playingSongInfo
      })
      const res = await getSongUrl(app.globalData.playingSongInfo.id)
      this.setData({
        songUrl:res.data[0].url
      })
      // 设置音乐播放内容
      this.setBackgroundMusic()
    },
    setBackgroundMusic(){
      // 设置音乐内容并初始化播放
      this.data.backgroundAudio.src = this.data.songUrl
      this.data.backgroundAudio.title=this.data.songInfo.name 
      if(app.globalData.isPlaying){
        this.playMusic()
      }else{
        this.pauseMusic()
      }
    },
    playMusic() {
      this.data.backgroundAudio.play()
      this.changePlayingStatus(true)
    },
    pauseMusic() {
      this.data.backgroundAudio.pause()
      wx.pauseBackgroundAudio()
      this.changePlayingStatus(false)
    },
    changePlayingStatus(isPlaying){
      this.setData({
        playing:isPlaying
      })
      app.globalData.isPlaying = isPlaying
      // 父组件元素变化
      this.triggerEvent('changeSongStatus',!isPlaying)
    }
  }
})
