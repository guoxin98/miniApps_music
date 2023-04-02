// pages/detail-search/index.js
import { getHotSearchList, getSearchMultimatch,getSearchSuggest } from '../../api/api-music'
import storage from '../../utils/storage'
const SEARCH_HISTORY = 'searchHistory'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:"", //搜索词
    hotSearchList:[], // 热门搜索列表
    isShowHotList:false, //是否展示热搜列表
    searchHistory:[],
    showDropdown:false, //是否展示搜索建议下拉菜单
    options:[], //搜索建议列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取热搜列表
    this.getHotSearchList()
    // 获取搜索历史
    this.getSearchHistory()
  },
  getSearchHistory(){
    this.setData({
      searchHistory:storage.get(SEARCH_HISTORY)??[]
    })
  },
  async getHotSearchList(){
    const res = await getHotSearchList()
    this.setData({
      hotSearchList:res.data,
      isShowHotList:true
    })
  },
  async handleSearchClick(e){
    // 触发搜索事件
    // e.currentTarget.dataset.keywords or e.detail
    this.setData({
      showDropdown:false
    })
    let keywords
    if(e.currentTarget.dataset.keywords){
      keywords = e.currentTarget.dataset.keywords
      this.setData({
        searchValue:keywords
      })
    }else{
      keywords=e.detail
    }
    const history = this.data.searchHistory.length?[keywords,...this.data.searchHistory]:[keywords]
    const historySet = Array.from(new Set(history))
    this.setData({
      searchHistory:historySet
    })
    storage.set(SEARCH_HISTORY,historySet)
    const res = await getSearchMultimatch(keywords)
  },
  async getSearchSuggest(e){
    // 触发搜索事件
    // e.currentTarget.dataset.keywords or e.detail
    if(e.detail){
      const keywords=e.detail
      const res = await getSearchSuggest(keywords)
      const obj = res.result
      // const keys = Object.keys(res.result)
      const options = []
      for(let key in obj){
        if(key!=='order'){
          obj[key].forEach(item=>{
            options.push(item.name)
          })
        }
      }
      this.setData({
        showDropdown:true,
        options:options
      })
    }else{
      this.setData({
        showDropdown:false
      })
    }
  },
  // 点击搜索框的清空按钮
  setShowDropdownValue(){
    this.setData({
      showDropdown:false
    })
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