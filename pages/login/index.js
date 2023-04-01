/*
 * @Author: guoxin
 * @Date: 2023-03-29 20:39:19
 * @LastEditors: guoxin
 * @LastEditTime: 2023-04-01 14:52:10
 * @Description: 小程序登录页面
 */
import Toast from '@vant/weapp/toast/toast';
import { sentCaptcha, verifyCaptcha,loginByCellPhone } from '../../api/api-login'
import storage from '../../utils/storage';
Page({
  data: {
    phone: '',
    code: '',
    canSendCode: true,
    codeButtonText: '获取验证码'
  },
  onLoad: function() {
    Toast.setDefaultOptions({
      duration: 2000, // 提示框持续时间
      mask: false, // 是否展示遮罩层
      position: 'center', // 提示框展示位置
      forbidClick: true, // 是否禁止背景点击
      password:''
    });
  },
  onPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  onSendCode: function () {
    // 发送验证码的逻辑
    // 先判断手机号码是否正确
    if (!/^1[3-9]\d{9}$/.test(this.data.phone)) {
      Toast('请输入正确的手机号');
      return;
    }
    // 更新按钮文本和状态
    this.setData({
      canSendCode: false,
      codeButtonText: '60s后重新获取'
    })
    // 发送验证码
    this.sentCaptcha()
    // 倒计时60s
    let count = 60
    const intervalId = setInterval(() => {
      count -= 1
      if (count > 0) {
        this.setData({
          codeButtonText: `${count}s后重新获取`
        })
      } else {
        clearInterval(intervalId)
        this.setData({
          canSendCode: true,
          codeButtonText: '获取验证码'
        })
      }
    }, 1000)
  },
  async sentCaptcha(){
    const phone = this.data.phone
    const res = await sentCaptcha(phone)
    console.log(res)
  },
  onSubmit: function (e) {
    const phone = this.data.phone
    const code = this.data.code

    // 校验表单内容
    if (!phone) {
      Toast('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Toast('请输入正确的手机号');
      return;
    }
    if (!code) {
      Toast('请输入验证码');
      return;
    }

    // 提交表单的逻辑
    // ...
    this.submitLoginForm()
  },
  async submitLoginForm(){
    const res = await loginByCellPhone(this.data.phone,this.data.password)
    if(res.code!==200&&res.message){
      Toast(res.message)
    }else{
      storage.set('token',res.data.verifyToken);
      wx.switchTab({
        url: "/pages/home-music/index",
      });
    }
    
  }
})