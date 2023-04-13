/*
 * @Author: guoxin
 * @Date: 2023-03-30 16:30:37
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-13 10:43:12
 * @Description: 播放音乐底部状态栏
 */
// components/background-audio-v1/index.js
const app = getApp();
const playModeMap = new Map()
playModeMap.set('随机播放','play_random')
playModeMap.set('列表播放','play_order')
playModeMap.set('单曲循环','play_repeat')
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
    songInfos:app.globalData.songInfos,
    songUrl:null,
    songInfo:null,
    musicStatus:true,
    playMode:'列表播放',
    playModeIcon:'play_order',
    backgroundAudio:null, //音频上下文
    isPopupShow:false, //展示列表播放弹出层
    isRestart:false
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
      app.globalData.isPlaying=false
      // 如果当前歌曲不是列表中的最后一首，则自动切换到下一首歌曲并开始播放
      if (app.globalData.currentIndex < musicList.length - 1) {
        app.globalData.isPlaying=true
        app.globalData.currentIndex=app.globalData.currentIndex+1
        app.globalData.playingSongInfo=musicList[app.globalData.currentIndex]
        this.initData()
      }
    })
    backgroundAudio.onPrev(() => {
      app.globalData.isPlaying=false
      // 如果当前歌曲不是列表中的第一首，则自动切换到上一首歌曲并开始播放
      if (app.globalData.currentIndex>0) {
        app.globalData.isPlaying=true
        app.globalData.currentIndex=app.globalData.currentIndex-1
        app.globalData.playingSongInfo=musicList[app.globalData.currentIndex]
        this.initData()
      }
    })
    backgroundAudio.onStop(()=>{
      this.changePlayingStatus(false)
    })
    backgroundAudio.onEnded(()=>{
      // 三种播放方式
      if(app.globalData.currentIndex===musicList.length-1){
        this.setData({
          isRestart:true
        })
        this.changePlayingStatus(false)
        return
      }
      let index 
      if(this.data.playModeIcon==='play_order'){
        // 顺序播放
        app.globalData.currentIndex=app.globalData.currentIndex+1
        app.globalData.playingSongInfo=musicList[app.globalData.currentIndex]
      }else if(this.data.playModeIcon==='play_random'){
        // 随机播放
        index= Math.floor(Math.random() * (musicList.length-1))
        app.globalData.currentIndex=index
        app.globalData.playingSongInfo=musicList[index]
      }
      // 单曲循环重置
      this.initData()
    })
  },
  attached(){
    this.initData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 切换音乐
    handleSongSwitch(e){
      const songInfo = e.currentTarget.dataset.songinfo
      app.globalData.playingSongInfo = songInfo
      this.initData()
      this.data.backgroundAudio.src = this.data.songInfo.src
      this.data.backgroundAudio.title=this.data.songInfo.title 
      this.data.backgroundAudio.coverImgUrl= this.data.songInfo.coverImgUrl
    },
    onClose(){
      this.setData({
        isPopupShow:false
      })
    },
    initData(){
      this.setData({
        songInfo:app.globalData.playingSongInfo,
        playing:app.globalData.isPlaying
      })
    },
    openListPoupu(){
      this.setData({
        isPopupShow:true,
        songInfos:app.globalData.songInfos
      })
    },  
    playMusic() {
      // 添加从头播放事件
      if(this.data.isRestart){
        this.data.backgroundAudio.src = this.data.songInfo.src
        this.data.backgroundAudio.title=this.data.songInfo.title 
        this.data.backgroundAudio.coverImgUrl= this.data.songInfo.coverImgUrl
      }
      this.data.backgroundAudio.play()
    },
    pauseMusic() {
      this.data.backgroundAudio.pause()
    },
    changePlayingStatus(isPlaying){
      // 父组件元素变化
      this.triggerEvent('changeSongStatus',isPlaying)
      this.setData({
        playing:isPlaying
      })
      app.globalData.isPlaying=isPlaying
    },
    // 改变播放模式-列表播放、单曲循环、随机播放
    changePlayMode(){
      const playModeIcon = this.data.playModeIcon
      if(playModeIcon==='play_order'){
        const playMode='随机播放'
        this.setData({
          playMode,
          playModeIcon:playModeMap.get(playMode),
        })
      }else if(playModeIcon==='play_random'){
        const playMode='单曲循环'
        this.setData({
          playMode,
          playModeIcon:playModeMap.get(playMode),
        })
      }else if(playModeIcon==='play_repeat'){
        const playMode='列表播放'
        this.setData({
          playMode,
          playModeIcon:playModeMap.get(playMode),
        })
      }
    },
  }
})
