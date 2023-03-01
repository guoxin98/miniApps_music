// 创建一个类封装
const BASE_URL= "http://localhost:3000/"
class Request{
  request(url,method,params){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:BASE_URL+url,
        method,
        data:params,
        success:function(res){
          resolve(res.data)
        },
        fail:function(err){
          reject(err)
        }
      })
    })
  }
  get(url,params){
    return this.request(url,"GET",params)
  }
  post(url,params){
    return this.request(url,"POST",params)
  }
}
const hyRequest = new Request()
export default hyRequest