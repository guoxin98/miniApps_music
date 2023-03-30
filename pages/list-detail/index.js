import {getPlayListDetail} from "../../api/api-music"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo:{},
    tracks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPlayListDetail(options.id)
  },
  getPlayListDetail(id){
    getPlayListDetail(id).then((res)=>{
      this.setData({
        listInfo:res.playlist,
        tracks:res.playlist.tracks
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