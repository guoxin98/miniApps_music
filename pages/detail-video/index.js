// pages/detail-video/index.js
import { getMVUrl, getMVDetail, getRelatedVideo} from "../../api/api-video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id:"",
    MVUrlInfo:{},
    MVDetail:{},
    relatedVideoList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取id
   this.setData({
    id:options.id
   })
   // 获取视频详情页信息
   this.getDetailVideo()
  },
  // 推荐视频跳转
  handleVideoItemClick(e){
    // e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${e.currentTarget.dataset.item.vid}`,
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  async getDetailVideo(){
    let [ MVUrlInfo, MVDetail, relatedVideoList] =await Promise.all([getMVUrl(this.data.id),getMVDetail(this.data.id),getRelatedVideo(this.data.id)])
    this.setData({
      MVUrlInfo:MVUrlInfo.data,
      MVDetail:MVDetail.data,
      relatedVideoList:relatedVideoList.data,
    })
    // // 请求播放地址
    // getMVUrl(this.data.id).then(res=>{
    //   this.setData({
    //     MVUrlInfo:res.data
    //   })
    // })
    // // 请求视频信息
    // getMVDetail(this.data.id).then(res=>{
    //   this.setData({
    //     MVDetail:res.data
    //   })
    // })
    // // 请求相关视频
    // getRelatedVideo(this.data.id).then(res=>{
    //   this.setData({
    //     relatedVideoList:res.data
    //   })
    // })
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