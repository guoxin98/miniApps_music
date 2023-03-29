/*
 * @Author: guoxin
 * @Date: 2023-03-29 21:39:25
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-29 21:57:14
 * @Description: 登录页面的api接口
 */
import hyRequest from "../utils/request";
// 发送验证码
export const sentCaptcha = (phone)=>{
  return hyRequest.get("captcha/sent",{phone})
}
// 验证验证码
export const verifyCaptcha = (phone,captcha)=>{
  return hyRequest.get("captcha/verify",{phone,captcha})
}
// 手机号登录
export const loginByCellPhone= (phone,password)=>{
  return hyRequest.get("login/cellphone",{phone,password})
}