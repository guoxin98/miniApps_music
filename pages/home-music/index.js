// pages/home-music/index.js
import { getBanner,getRecomendSongs,getHotPlayList, getToplist} from '../../api/api-music'
import queryReact from '../../utils/query-react'
const app =  getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[], //轮播图数组
    // height:0, //轮播图高度
    timeId:null, //节流
    recommendList:[], //推荐歌曲
    topList:[], //巅峰榜单
    hotPlayList:[], //热门歌单
    isShow:false,
    compareSongInfo:null, //比较的歌词
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取音乐首页数据
    this.getHomeMusicData()
  },
  getHomeMusicData(){
    // 轮播图
    getBanner(1).then((res)=>{
      this.setData({
        bannerList:res.banners
      }) 
    })
    //推荐歌曲
    getRecomendSongs(10).then(res=>{
      this.setData({
        hotPlayList:res.result
      })
    })
    // 热门歌单
    // getHotPlayList().then(res=>{
    //   this.setData({
    //     recommendList:res.tags
    //   })
    // })
    getToplist().then(res=>{
      this.setData({
        topList:res.list.splice(0,4)
      })
    })
  },
  // 图片加载完成
  swiperImageLoaded(){
    // 获取图片高度_防抖
    if(this.data.timeId!==null){
      clearTimeout(this.data.timeId)
    }
    this.data.timeId=setTimeout(()=>{
      queryReact('.swiper-image').then((res)=>{
        this.setData({
          height:res[0].height,
        })
      })
    },1000)
    // 获取图片高度_节流
    // if(this.data.timeId!==null){
    //   return
    // }
    // setTimeout(()=>{
    //   queryReact('.swiper-image').then((res)=>{
    //     this.setData({
    //       height:res[0].height,
    //       timeId:null
    //     })
    //   })
    // },1000)
  },
  handleSearchClick(){
    wx.navigateTo({
      url: '/pages/detail-search/index',
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  goTopListDetail(e){
    wx.navigateTo({
      url: `/pages/list-detail/index?id=${e.currentTarget.dataset.item.id}`,
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options) {
    const songInfo = app.globalData.playingSongInfo
    const isPlaying = app.globalData.isPlaying
    if(songInfo){
      // 如果存在全局属性
      // 判断该属性的值是否和初始值一致
      const backgroundAudio =  this.selectComponent('#bgAudio')
      if(songInfo){
        if(this.data.compareSongInfo&&this.data.compareSongInfo.id!==songInfo.id){
        // 歌曲不一致，调用子组件，重新获取歌曲
          this.setData({
            compareSongInfo:songInfo,
            isShow:true
          })
          backgroundAudio.getSongUrl()
          if(!isPlaying){
            backgroundAudio.pauseMusic()
          }
        }else if(this.data.compareSongInfo&&this.data.compareSongInfo.id!==songInfo.id){
          this.setData({
            isShow:true
          })
        }else{
          this.setData({
            compareSongInfo:songInfo,
            isShow:true
          })
          if(!isPlaying){
            backgroundAudio.pauseMusic()
          }
        }
        // else{
        //   this.setData({
        //     compareSongInfo:songInfo,
        //     isShow:true
        //   })
        //   if(!isPlaying){
        //     backgroundAudio.pauseMusic()
        //   }
        // }
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearTimeout(this.data.timeId)
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