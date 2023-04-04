/*
 * @Author: guoxin
 * @Date: 2023-03-02 16:34:05
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-04 12:13:11
 * @Description: 新增高亮效果
 */
// components/song-item-v2/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songInfo:{
      type:Object,
      value:{}
    },
    isShowHighLight:{
      type:Boolean,
      value:false
    },
    keywords:{
      type:String,
      value:'',
    },
    // 普通文本颜色
    normalColor:{
      type:String,
      value:'#444242bd'
    },
    // 高亮颜色
    hightLightColor:{
      type:String,
      value:'#507daf'
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
