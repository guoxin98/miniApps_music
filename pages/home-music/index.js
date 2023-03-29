// pages/home-music/index.js
import { getBanner,getRecomendSongs,getHotPlayList, getToplist} from '../../api/api-music'
import queryReact from '../../utils/query-react'
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getStorageSync('token')) {
      // 已登录，进行鉴权操作
    } else {
      // 未登录，跳转到登录页面
      wx.navigateTo({
        url: '/pages/login/index'
      })
    }
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
    getHotPlayList().then(res=>{
      this.setData({
        recommendList:res.tags
      })
    })
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
  onShow() {
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