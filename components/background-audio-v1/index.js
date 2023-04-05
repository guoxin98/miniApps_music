/*
 * @Author: guoxin
 * @Date: 2023-03-30 16:30:37
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-05 16:48:29
 * @Description: 播放音乐底部状态栏
 */
// components/background-audio-v1/index.js
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
    songInfo:null,
    musicStatus:true,
    backgroundAudio:null, //音频上下文
    isPopupShow:false, //展示列表播放弹出层
  },
  created(){
    const backgroundAudio = app.globalData.backgroundAudioContext
    const musicList = app.globalData.songInfos
    this.setData({
      backgroundAudio:backgroundAudio
    })
    backgroundAudio.onPlay(()=>{
      this.changePlayingStatus(true)
    })
    backgroundAudio.onPause(()=>{
      this.changePlayingStatus(false)
    })
    backgroundAudio.onNext(() => {
      app.globalData.isPlaying=true
      // 如果当前歌曲不是列表中的最后一首，则自动切换到下一首歌曲并开始播放
      if (app.globalData.currentIndex < musicList.length - 1) {
        app.globalData.currentIndex=app.globalData.currentIndex+1
        app.globalData.playingSongInfo=musicList[app.globalData.currentIndex]
        this.initData()
      }
    })
    backgroundAudio.onPrev(() => {
      app.globalData.isPlaying=true
      // 如果当前歌曲不是列表中的第一首，则自动切换到上一首歌曲并开始播放
      if (app.globalData.currentIndex>0) {
        app.globalData.currentIndex=app.globalData.currentIndex-1
        app.globalData.playingSongInfo=musicList[app.globalData.currentIndex]
        this.initData()
      }
    })
    backgroundAudio.onStop(()=>{
      console.log('onStop')
      this.changePlayingStatus(false)
    })
  },
  attached(){
    this.initData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initData(){
      this.setData({
        songInfo:app.globalData.playingSongInfo
      })
      // 设置音乐列表播放内容
      this.data.backgroundAudio.src = this.data.songInfo.src
      this.data.backgroundAudio.title=this.data.songInfo.title 
      this.data.backgroundAudio.coverImgUrl= this.data.songInfo.coverImgUrl
      if(app.globalData.isPlaying){
        this.data.backgroundAudio.play()
      }else{
        this.data.backgroundAudio.pause()
      }
      this.setData({
        playing:app.globalData.isPlaying
      })
    },
    openListPoupu(){
      this.setData({
        isPopupShow:true
      })
    },  
    playMusic() {
      this.data.backgroundAudio.play()
    },
    pauseMusic() {
      this.data.backgroundAudio.pause()
    },
    changePlayingStatus(isPlaying){
      this.setData({
        playing:isPlaying
      })
      app.globalData.isPlaying=isPlaying
      // 父组件元素变化
      this.triggerEvent('changeSongStatus',isPlaying)
    }
  }
})
