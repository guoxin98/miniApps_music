/*
 * @Author: guoxin
 * @Date: 2023-02-18 10:53:49
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-30 22:14:33
 * @Description: 工具函数集合
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
module.exports = {
  formatTime,
}
