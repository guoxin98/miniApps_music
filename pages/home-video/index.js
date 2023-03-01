// pages/home-video/index.js

//  api请求
import {getTopMV} from '../../api/api-video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs:[],
    offset:0,
    limit:10,
    hasMore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTopMV()
  },
  getTopMV(){
    const obj = {
      offset:this.data.offset,
      limit:this.data.limit,
    }
    getTopMV(obj).then(res=>{
      this.setData({
        topMVs:this.data.topMVs.length?
        this.data.offset===0?
        res.data:this.data.topMVs.concat(res.data)
        :res.data,
        hasMore:res.hasMore
      })
      wx.hideNavigationBarLoading()
      if(this.data.offset===0){
        wx.stopPullDownRefresh()
      }
    })
  },
  // 点击事件
  handleVideoItemClick(event){
    const id = event.currentTarget.dataset.item.id //获取点击的视频的id
   wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
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
    this.setData({
      offset:0
    })
    this.getTopMV()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.hasMore){
      this.setData({
        offset:this.data.offset+this.data.limit
      })
      wx.showNavigationBarLoading()
      this.getTopMV()
    }
    if(this.data.offset===0){
      wx.startPullDownRefresh()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})