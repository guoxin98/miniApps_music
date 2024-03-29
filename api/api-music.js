/*
 * @Author: guoxin
 * @Date: 2023-03-01 19:45:57
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-07 11:07:02
 * @Description: 请填写简介
 */
import hyRequest from "../utils/request";
// 获取轮播图
export const getBanner = (type=0)=>{
  return hyRequest.get('banner',{
    type
  })
}
// 获取推荐歌曲
export const getRecomendSongs = (limit)=>{
  return hyRequest.get('personalized',{
    limit
  })
}

// 热门歌单
export const getHotPlayList = ()=>{
  return hyRequest.get('top/playlist')
}
// 获取榜单及摘要
export const getToplist = ()=>{
  return hyRequest.get('toplist/detail')
}
// 歌单详情
export const getPlayListDetail = (id)=>{
  return hyRequest.get('playlist/detail',{id})
}
// 获取音乐播放地址
export const getSongUrl = (ids)=>{
  let id = ''
  if(ids instanceof Array && ids.length>1){
    id =  ids.map(item=>item).join(',')
  }else{
    id=ids
  }
  return hyRequest.get('song/url',{id})
}
// 获取热搜列表
export const getHotSearchList = ()=>{
  return hyRequest.get('search/hot/detail')
}
// 搜索建议
export const getSearchSuggest = (keywords)=>{
  return hyRequest.get('search/suggest',{keywords})
}
// 搜索匹配结果
export const getSearchResult = (keywords,limit=30,offset=0,type=1)=>{
  return hyRequest.get('search',{keywords,limit,offset,type})
}
// 获取歌词
export const getSongLyric = (id)=>{
  return hyRequest.get('lyric',{id})
}
// 获取歌曲详情
export const getSongDetail = (ids)=>{
  return hyRequest.get('song/detail',{ids})
}