/*
 * @Author: guoxin
 * @Date: 2023-03-30 16:30:37
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-01 01:05:16
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
    // songInfo:{
    //   type:Object,
    //   value:{},
    //   observer: function(newVal, oldVal) {
    //     if(this.data.songUrl){
    //       // 当切换音频的时候，会自动开始播放新的歌曲
    //       this.getSongUrl()
    //     }
    //   }
    // },
    // isChangeSong:{
    //   type:Boolean,
    //   value:false
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: true,
    songUrl:null,
    songInfo:app.globalData.playingSongInfo,
    musicStatus:true,
    innerAudioContext:null, //音频上下文
  },
  created(){
    const innerAudioContext = app.globalData.audioContext
    this.setData({
      innerAudioContext:innerAudioContext,
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
      console.log(app.globalData.playingSongInfo.name)
      const res = await getSongUrl(app.globalData.playingSongInfo.id)
      this.setData({
        songUrl:res.data[0].url
      })
      // 设置音乐播放内容
      this.setBackgroundMusic()
    },
    setBackgroundMusic(){
      // 设置音乐内容并初始化播放
      this.data.innerAudioContext.src = this.data.songUrl
      this.data.innerAudioContext.autoplay=true
      this.data.innerAudioContext.loop = true
      
      this.playMusic()
      // 背景音乐的创建方法
      // const bgMusic = wx.getBackgroundAudioManager()
      // // 设置音频属性
      // bgMusic.src = this.data.songUrl
      // bgMusic.title = 'my song'
      // bgMusic.play()
    },
    playMusic() {
      this.data.innerAudioContext.play()
      this.changePlayingStatus(true)
    },
    pauseMusic() {
      this.data.innerAudioContext.pause()
      this.changePlayingStatus(false)
    },
    changePlayingStatus(isPlaying){
      this.setData({
        playing:isPlaying
      })
      // 父组件元素变化
      this.triggerEvent('changeSongStatus',!isPlaying)
    }
  }
})
