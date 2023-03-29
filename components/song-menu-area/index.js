// components/song-menu-area/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // screenWidth:app.globalData.screenWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTopListDetail(e){
      wx.navigateTo({
        url: `/pages/list-detail/index?id=${e.currentTarget.dataset.item.id}`,
        success: (result)=>{
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
  },
  options:{
    styleIsolation: 'apply-shared',
  }
})
