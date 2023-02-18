import hyRequest from "../utils/request";
export const getTopMV = (data)=>{
  return hyRequest.get("top/mv",data)
}