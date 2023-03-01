import hyRequest from "../utils/request";
// 获取轮播图
export const getBanner = (type=0)=>{
  return hyRequest.get('banner',{
    type
  })
}