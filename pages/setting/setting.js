// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') // 检查是否支持 open-type="getUserInfo"
  },
  
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 等待 getUserInfo 的回调
      app.userInfoReadyCallback = this.userInfoReadyCallback
    } else {
      // 兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: () => {
          // 用户拒绝授权的处理
          console.log('用户拒绝授权')
        }
      })
    }
  },

  userInfoReadyCallback: function(res) {
    app.globalData.userInfo = res.userInfo
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    })
  },

  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      // 用户拒绝授权的处理
      console.log('用户拒绝授权')
    }
  },

  openSetting: function() {
    wx.navigateTo({
      url: '/pages/setting/setting'
    })
  }
})
