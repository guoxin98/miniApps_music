/*
 * @Author: guoxin
 * @Date: 2023-03-30 16:30:37
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-30 21:31:13
 * @Description: 播放音乐后底部状态栏
 */
// components/background-audio-v1/index.js
import {getSongUrl} from '../../api/api-music'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songInfo:{
      type:Object,
      value:{}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: true,
    songUrl:null,
    musicStatus:true,
    innerAudioContext:null
  },
  attached(){
    this.getSongUrl()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getSongUrl(){
      const res = await getSongUrl(this.properties.songInfo.id)
      this.setData({
        songUrl:res.data[0].url
      })
      // 获取完音乐播放地址后创建音频
      this.createBackgroundMusic()
    },
    createBackgroundMusic(){
      // 创建音频上下文
      const innerAudioContext = wx.createInnerAudioContext()
      // 设置音频属性
      innerAudioContext.src = this.data.songUrl
      innerAudioContext.autoplay=true
      innerAudioContext.loop = true
      this.setData({
        innerAudioContext:innerAudioContext
      })
      // 背景音乐的创建方法
      // const bgMusic = wx.getBackgroundAudioManager()
      // // 设置音频属性
      // bgMusic.src = this.data.songUrl
      // bgMusic.title = 'my song'
      // bgMusic.play()
    },
    playMusic() {
      this.data.innerAudioContext.play()
      this.changePlayingState(true)
    },
    pauseMusic() {
      this.data.innerAudioContext.pause()
      this.changePlayingState(false)
    },
    changePlayingState(isPlaying){
      this.setData({
        playing:isPlaying
      })
    }
  }
})
