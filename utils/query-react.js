
// 获取组件高度
export default function(selector){
  return new Promise ((resolve)=>{
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(resolve)
  })
}