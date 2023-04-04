// pages/detail-search/index.js
import { getHotSearchList, getSearchResult,getSearchSuggest } from '../../api/api-music'
import storage from '../../utils/storage'
import {formatSongAr } from '../../utils/util'
const SEARCH_HISTORY = 'searchHistory'
const SHOW_DEFAULT_PAGE = 'showDefaultPage'
const SHOW_SUGGESTION_PAGE = 'showSuggestionPage'
const SHOW_SERACH_RESULT_PAGE = 'showSearchResultPage'
const SHOW_LOADING_PAGE = 'showLoadingPage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:SHOW_DEFAULT_PAGE,
    searchValue:"", //搜索词
    hotSearchList:[], // 热门搜索列表
    isShowHotList:false, //是否展示热搜列表
    searchHistory:[],
    options:[], //搜索建议列表
    songList:[], // 搜索歌曲结果列表
    offset:0, // 偏移量
    hasMore:false, //是否还有更多
    showLoading:false, //是否展示加载动画
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
    this.getComputedActive(SHOW_LOADING_PAGE)
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
      searchHistory:historySet,
      // 初始化查询数据
      offset:0,
      songList:[]
    })
    storage.set(SEARCH_HISTORY,historySet)
    this.getSearchResult(keywords)
    this.getComputedActive(SHOW_SERACH_RESULT_PAGE)
  },
  async getSearchResult(keywords=this.data.searchValue){
    // 四个参数：关键词、数量、偏移量、类型1：单曲
    const res = await getSearchResult(keywords,30,this.data.offset,1)
    let songList = res.result.songs.map(({album,artists,name,id})=>{
      const artistsName = formatSongAr(artists)
      return {
        artists:artistsName,
        albumName:album.name,
        name,
        id
      }
    })
    songList=this.data.songList.length?[...this.data.songList,...songList]:[...songList]
    this.setData({
      songList:songList,
      hasMore:res.result.hasMore,
    })
  },
  async getSearchSuggest(e){
    // 触发搜索事件
    // e.currentTarget.dataset.keywords or e.detail
    if(e.detail){
      const keywords=e.detail
      const res = await getSearchSuggest(keywords)
      const obj = res.result
      const options = []
      for(let key in obj){
        if(key!=='order'){
          obj[key].forEach(item=>{
            options.push(item.name)
          })
        }
      }
      this.setData({
        options:options
      })
      this.getComputedActive(SHOW_SUGGESTION_PAGE)
    }else{
      this.setData({
      })
      this.getComputedActive(SHOW_DEFAULT_PAGE)
    }
    
  },
  /**
   * @description: 更改van-tab属性
   * @param {*} activeName a:展示初始列表 b:展示搜索建议页面 c:展示搜索结果页面 d:展示loading加载动画
   * @return {*}
   */  
  getComputedActive(activeName){
    this.setData({
      active:activeName
    })
  },
  // 点击搜索框的清空按钮
  setShowSuggestionListValue(){
    this.getComputedActive(SHOW_DEFAULT_PAGE)
  },
  // 清空搜索历史
  clearSearchHistory(){
    storage.remove(SEARCH_HISTORY)
    this.setData({
      searchHistory:[]
    })
  },
  // 点击播放按钮跳转到音乐播放器页面
  playSong(){
  wx.navigateTo({
    url: '/pages/music-player/index'
  });
  },
  // 点击加载更多
  handleShowMoreResults(){
    const offset = this.data.offset+1
    this.setData({
      offset:offset,
      showLoading:true
    })
    this.getSearchResult()
    setTimeout(() => {
      this.setData({
        showLoading:false
      })
    }, 1000);
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