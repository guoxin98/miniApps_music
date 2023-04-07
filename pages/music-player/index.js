// pages/music-player/index.js
import { getSongDetail, getSongLyric, getSongUrl } from '../../api/api-music'
import { formatSongAr } from '../../utils/util'
const app = getApp()
import Lyric from 'lyric-parser'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicInfo:{},
    musicId:null,
    lines:[],
    scrollToText:null,
    isDialogShow:false,
    songUrl:null,
    playing:true, // 是否正在播放背景音乐、控制页面的播放暂停按钮显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      musicId:options.id
    })
    this.initData()
  },
  initData(){
    this.getSongDetail()
    this.getSongLyric()
  },
  async getSongDetail(){
    const res = await getSongDetail(this.data.musicId)
    const songInfo = res.songs[0]
    // 筛选处理
    this.setData({
      musicInfo:{
        albumName:songInfo.al.name,
        picUrl:songInfo.al.picUrl,
        author:formatSongAr(songInfo.ar),
        name:songInfo.name
      }
    })
    this.getSongUrl()
  },
  async getSongLyric(){
    const res = await getSongLyric(this.data.musicId)
    // 歌词解析
    this.parseSongLyric(res.lrc.lyric)
  },
  async getSongUrl(){
    const res = await getSongUrl(this.data.musicId)
    this.setData({
      songUrl:res.data[0]
    })
    const songInfo = {
      coverImgUrl:this.data.musicInfo.picUrl,
      id:this.data.musicId,
      src:res.data[0].url,
      title:this.data.musicInfo.name
    }
    // 初始化背景音乐并播放
    this.initBackgroundAudio(songInfo)
  },
  initBackgroundAudio(songInfo){
    app.globalData.playingSongInfo = songInfo
    const backgroundAudio = app.globalData.backgroundAudioContext
    if(songInfo.src){
      backgroundAudio.src = songInfo.src
      backgroundAudio.title= songInfo.title 
      backgroundAudio.coverImgUrl= songInfo.coverImgUrl
      app.globalData.isPlaying= true
      backgroundAudio.play()
    }else{
      // 无法获取到url
      this.setData({
        isDialogShow:true,
        playing:false
      })
      app.globalData.isPlaying=false
      backgroundAudio.pause()
    }
  },
  parseSongLyric(lyric){
    const lyricParser = new Lyric(lyric, this.handleLyric)
    this.setData({
      lines:lyricParser.lines.map(item=>{
        return {
          ...item,
          isHightLightText:false
        }
      }),
    })
  },
  handleLyric({ lineNum, txt }) {
    console.log(`Line ${lineNum}: ${txt}`)
  },
  // 当进度条改变时，歌词进度也改变
  lyricChange(currentTime){
    const lines = this.data.lines
    let index = 0;
    for(let i = 0 ; i<lines.length;i++){
      lines[i].isHightLightText=false
      if(currentTime<lines[i].time){
        index=i-2
        lines[i-1].isHightLightText=true
        break
      }
    }
    this.setData({
      lines,
      scrollToText:'scroll'+index
    })
  },
  // 改变暂停播放转台
  handleChangePlayingStatus(){
    const playing = this.data.playing
    this.setData({
      playing:!playing
    })
    app.globalData.isPlaying = !playing
    const backgroundAudio = app.globalData.backgroundAudioContext
    if(playing){
      backgroundAudio.pause()
    }else{
      backgroundAudio.play()
    }
  },
  closeDialog(){
    this.setData({
      isDialogShow:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const backgroundAudio = app.globalData.backgroundAudioContext
    backgroundAudio.onTimeUpdate(()=>{
      const currentTime = (backgroundAudio.currentTime).toFixed(2)*1000
      // (backgroundAudio.currentTime).toFixed(2)*1000
      this.lyricChange(currentTime)
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})