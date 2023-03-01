import hyRequest from "../utils/request";
export const getTopMV = (data)=>{
  return hyRequest.get("top/mv",data)
}
// 请求mv播放地址
export const getMVUrl = (id) =>{
  return hyRequest.get("mv/url",{
    id
  })
}
// 请求mv详细信息
export const getMVDetail = (mvid) =>{
  return hyRequest.get("mv/detail",{
    mvid
  })
}
// 获取相关视频
export const getRelatedVideo = (id) =>{
  return hyRequest.get("related/allvideo",{
    id
  })
}
// 相关视频详情
export const getVideoDetail = (id) =>{
  return hyRequest.get("video/detail",{
    id
  })
}
