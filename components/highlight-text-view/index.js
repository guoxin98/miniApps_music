/*
 * @Author: guoxin
 * @Date: 2023-04-04 11:11:22
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-04 12:11:56
 * @Description: 高亮文本封装组件
 */
// components/hightlight-text-view/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:''
    },
    keywords:{
      type:String,
      value:''
    },
    // 标准颜色
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
  attached(){
    // 文本处理
    const arr = this.getHilightStrArray(this.properties.text,this.properties.keywords)
    this.setData({
      textArr:arr
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    textArr:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //返回一个使用key切割str后的数组，key仍在数组中
    getHilightStrArray: function(str, key) {
       return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
    }
  }
})
