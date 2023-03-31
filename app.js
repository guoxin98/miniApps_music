/*
 * @Author: guoxin
 * @Date: 2023-02-18 10:53:49
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-01 00:48:21
 * @Description: void
 */
App({
  onLaunch: function() {
    // 创建一个全局音乐实例
    this.globalData.audioContext = wx.createInnerAudioContext();
  },
  globalData: {
    audioContext: null,
    playingSongInfo:null, //当前播放的音乐信息
  },
})
