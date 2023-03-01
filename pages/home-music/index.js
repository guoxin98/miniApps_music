// pages/home-music/index.js
import {getBanner} from '../../api/api-music'
import queryReact from '../../utils/query-react'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    height:0,
    timeId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取音乐首页数据
    this.getHomeMusicData()
  },
  async getHomeMusicData(){
    const res = await getBanner(1)
    this.setData({
      bannerList:res.banners
    })
  },
  // 图片加载完成
  swiperImageLoaded(){
    // 获取图片高度_防抖
    // if(this.data.timeId!==null){
    //   clearTimeout(this.data.timeId)
    // }
    // this.data.timeId=setTimeout(()=>{
    //   queryReact('.swiper-image').then((res)=>{
    //     console.log('success',this.data.timeId)
    //     this.setData({
    //       height:res[0].height,
    //     })
    //   })
    // },1000)
    // 获取图片高度_节流
    if(this.data.timeId!==null){
      return
    }
    setTimeout(()=>{
      queryReact('.swiper-image').then((res)=>{
        console.log('success',this.data.timeId)
        this.setData({
          height:res[0].height,
          timeId:null
        })
      })
    },1000)
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