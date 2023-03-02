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