/*
 * @Author: guoxin
 * @Date: 2023-03-31 22:01:05
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-31 22:16:36
 * @Description: 对本地存储进行操作封装
 */
const storage = {
  set(key, value) {
    try {
      const str = JSON.stringify(value);
      wx.setStorageSync(key, str);
    } catch (e) {
      console.error(`Failed to set ${key} to localStorage: ${e}`);
    }
  },
  get(key, defaultValue = null) {
    try {
      const str = wx.getStorageSync(key);
      if (str === null) {
        return defaultValue;
      }
      return JSON.parse(str);
    } catch (e) {
      // console.error(`Failed to get ${key} from localStorage: ${e}`);
      return false;
    }
  },
  remove(key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      console.error(`Failed to remove ${key} from localStorage: ${e}`);
    }
  },
};
export default storage;
