/*
 * @Author: guoxin
 * @Date: 2023-02-18 10:53:49
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-01 21:10:46
 * @Description: void
 */
App({
  onLaunch: function() {
    // 创建一个全局音乐实例
    // this.globalData.audioContext = wx.createInnerAudioContext();
    // 新版本使用getBackgroundAudioManager获取音乐实例
    this.globalData.backgroundAudioContext = wx.getBackgroundAudioManager();
  },
  globalData: {
    backgroundAudioContext:null,
    playingSongInfo:null, //当前播放的音乐信息
    isPlaying:false, //当前是否正在播放音乐
  }
})