import {getPlayListDetail,getSongUrl} from "../../api/api-music"
import storage from "../../utils/storage"
const app =  getApp();
const AUDIO_COMPONENT_SELECTOR = '#bgAudio';  //底部音乐组件选择器
// import backgroundAudioManager from '../../utils/backgroundAudio'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listInfo:{},
    tracks:[],
    musicStatus:true,
    songInfo:null,
    songsIds:[], //播放列表的id集合
    isShow:false,
    isRefreshTracks:false,
    isGetSongList:false, //是否已经获取过音乐列表
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
  // 为了方便控制播放暂停按钮的样式变换
  // playSong、pauseSong事件都会触发子组件的playMusic、pauseMusic事件，在子组件的事件触发后会改变页面的状态
  /**
   * @description: 点击按钮播放音乐事件
   * @return {void}
   */
  async playSong(event){
    if(!this.data.isGetSongList){
      // 获取音乐列表
      await this.getSongUrl()
    } 
    const { info } = event.currentTarget.dataset
    const songInfo = app.globalData.songInfos.find((item,index)=>{
      app.globalData.currentIndex  = index
      return item.id ===info.id
    });
    this.setData({
      songInfo:songInfo
    })
    app.globalData.isPlaying = true
    if(app.globalData.playingSongInfo){
      if(this.data.songInfo.id!==app.globalData.playingSongInfo.id){
        // 点击播放的歌曲和全局变量中的歌曲不一致，重新赋值
        app.globalData.playingSongInfo=songInfo
        this.setData({
          isShow:true
        })
        const backgroundAudio =  this.selectComponent(AUDIO_COMPONENT_SELECTOR)
        backgroundAudio.initData()
      }else{
        const backgroundAudio =  this.selectComponent(AUDIO_COMPONENT_SELECTOR)
        backgroundAudio.playMusic()
      }
    }else{
      app.globalData.playingSongInfo=songInfo
      this.setData({
        isShow:true
      })
      const backgroundAudio =  this.selectComponent(AUDIO_COMPONENT_SELECTOR)
      backgroundAudio.playMusic()
    }
  },
  /**
   * @description: 点击按钮暂停音乐事件
   * @return {*}
   */  
  pauseSong(){
    app.globalData.isPlaying = false
    const backgroundAudio =  this.selectComponent(AUDIO_COMPONENT_SELECTOR)
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
      const ids = []
      const tracks = res.playlist.tracks.map(item=>{
        ids.push(item.id)
        return {
          ...item,
          isPlaying:false
        }
      })
      // 播放列表的id
      app.globalData.songIds=[...ids]
      this.setData({
        listInfo:res.playlist,
        tracks:tracks
      })
      if(this.data.isRefreshTracks){
        this.changeTrackStatus(false,app.globalData.playingSongInfo)
      }
    })
  },
  async getSongUrl(){
    // const res = await getSongUrl([app.globalData.playingSongInfo.id])
    const res = await getSongUrl(app.globalData.songIds)
    // 合并数组
    const  mergeArr = this.data.tracks.concat(res.data)
    // 根据id去重
    const newArr = mergeArr.reduce((acc, obj) => {
      let existingObj = acc.find(item => item.id === obj.id);
      if (existingObj) {
        Object.assign(existingObj, obj);
      } else {
        acc.push({id: obj.id, ...obj});
      }
      return acc;
    }, []);
    // 筛选属性
    app.globalData.songInfos = newArr.map(({id,url,al:{name,picUrl}})=>{
      return {
        id,
        src:url,
        coverImgUrl:picUrl,
        title:name
      }
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
    if(app.globalData.playingSongInfo){
      if(app.globalData.isPlaying){
        this.setData({
          isRefreshTracks:true
        })
      }
    }
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