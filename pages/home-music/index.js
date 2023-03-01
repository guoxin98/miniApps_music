// pages/home-music/index.js
import {getBanner} from '../../api/api-music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取音乐首页数据
    this.getHomeMusicData()
  },
  async getHomeMusicData(){
    const res = await getBanner()
    this.setData({
      bannerList:res.banners
    })
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