import {getPlayListDetail} from "../../api/api-music"
import storage from "../../utils/storage"
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo:{},
    tracks:[],
    musicStatus:true,
    songInfo:null,
    isShow:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.playingSongInfo){
      this.setData({
        isShow:true,
        songInfo:app.globalData.playingSongInfo
      })
    }
    this.getPlayListDetail(options.id)
  },
  onShow(options){
    console.log(options)
    // if(app.globalData.playingSongInfo){
    //   if(this.data.songInfo&&this.data.songInfo.id===app.globalData.playingSongInfo.id){
    //     this.changeTrackStatus(options.isPlaying)
    //   }
    // }
  },
  // 为了方便控制播放暂停按钮的样式变换
  // playSong、pauseSong事件都会触发子组件的playMusic、pauseMusic事件，在子组件的事件触发后会改变页面的状态
  /**
   * @description: 点击按钮播放音乐事件
   * @return {void}
   */
  playSong(event){
    const { info } = event.currentTarget.dataset
    this.setData({
      songInfo:info
    })
    app.globalData.isPlaying = true
    if(app.globalData.playingSongInfo){
      if(this.data.songInfo.id!==app.globalData.playingSongInfo.id){
        app.globalData.playingSongInfo=info
        this.setData({
          isShow:true
        })
        const backgroundAudio =  this.selectComponent('#bgAudio')
        backgroundAudio.getSongUrl()
      }
    }else{
      app.globalData.playingSongInfo=info
      this.setData({
        isShow:true
      })
    }
  },
  /**
   * @description: 点击按钮暂停音乐事件
   * @return {*}
   */  
  pauseSong(){
    app.globalData.isPlaying = false
    const backgroundAudio =  this.selectComponent('#bgAudio')
    backgroundAudio.pauseMusic()
  },
  // 修改tracks的方法
  changeTrackStatus(playing,info=this.data.songInfo){
    const newTracks = this.data.tracks.map(tracks=>{
      if(tracks.id===info.id){
        tracks.isPlaying=!playing
      }else{
        tracks.isPlaying=false
      }
      return tracks
    })
    this.setData({
      tracks:newTracks
    })
  },
  // 子组件修改音乐播放暂停，父组件页面发生变化
  changePlayingSong(e){
    this.changeTrackStatus(e.detail)
  },
  getPlayListDetail(id){
    getPlayListDetail(id).then((res)=>{
      const tracks = res.playlist.tracks.map(item=>{
        return {
          ...item,
          isPlaying:false
        }
      })
      this.setData({
        listInfo:res.playlist,
        tracks:tracks
      })
    })
  },
  onShareTap: function () {
    wx.showActionSheet({
      itemList: ['分享给好友', '分享到朋友圈', '分享到QQ'],
      success: function (res) {
        if (res.tapIndex === 0) {
          // 分享给好友
          wx.updateShareMenu({
            title: '分享标题',
            withShareTicket:true,
            imageUrl: 'https://p1.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg',
            success: function () {
              console.log('分享成功')
            },
            fail: function () {
              console.log('分享失败')
            }
          })
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          wx.updateShareMenu({
            withShareTicket: true,
            success: function () {
              wx.shareAppMessage({
                title: '分享标题',
                imageUrl: '分享图片的链接',
                success: function () {
                  console.log('分享成功')
                },
                fail: function () {
                  console.log('分享失败')
                }
              })
            }
          })
        } else if (res.tapIndex === 2) {
          // 分享到QQ
          wx.showModal({
            title: '提示',
            content: 'QQ分享功能暂未开放，敬请期待！',
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 渲染背景图片
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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