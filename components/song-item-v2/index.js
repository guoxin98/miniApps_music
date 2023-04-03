// components/song-item-v2/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songInfo:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    playSong(e){
      const { info } = e.currentTarget.dataset
      this.triggerEvent('playSong',info)
    },
    pauseSong(){
      this.triggerEvent('pauseSong')
    },
  }
})
