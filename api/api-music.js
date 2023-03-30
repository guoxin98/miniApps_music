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
export const getSongUrl = (id)=>{
  return hyRequest.get('song/url',{id})
}
