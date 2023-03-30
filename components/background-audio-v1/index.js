/*
 * @Author: guoxin
 * @Date: 2023-03-30 16:30:37
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-30 17:03:58
 * @Description: 播放音乐后底部状态栏
 */
// components/background-audio-v1/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicStatus:{
      type:Boolean,
      value:true
    },
    // playing: {
    //   type:Boolean,
    //   value:false
    // },
    // musicCover: {
    //   type:String,
    //   value:''
    // },
    // musicName: {
    //   type:String,
    //   value:''
    // },
    // musicAuthor: {
    //   type:String,
    //   value:''
    // }
    songInfo:{
      type:Object,
      value:{}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow() {
      const bgMusic = wx.getBackgroundAudioManager()
      if (bgMusic.paused) {
        this.setData({
          musicStatus: false,
          playing: false
        })
      } else {
        this.setData({
          musicStatus: true,
          playing: true,
          musicCover: bgMusic.coverImgUrl,
          musicName: bgMusic.title,
          musicAuthor: bgMusic.singer
        })
      }
      bgMusic.onPlay(() => {
        this.setData({
          musicStatus: true,
          playing: true,
          musicCover: bgMusic.coverImgUrl,
          musicName: bgMusic.title,
          musicAuthor: bgMusic.singer
        })
      })
      bgMusic.onPause(() => {
        this.setData({
          musicStatus: true,
          playing: false
        })
      })
      bgMusic.onStop(() => {
        this.setData({
          musicStatus: false,
          playing: false
        })
      })
    },
    playMusic() {
      wx.getBackgroundAudioManager().play()
    },
    pauseMusic() {
      wx.getBackgroundAudioManager().pause()
    }
  }
})
