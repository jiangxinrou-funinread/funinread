Page({
  data: {
    isDarkMode: false // 深色模式状态
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '设置' // 设置导航栏标题为"设置"
    });
  },

  // 跳转到用户协议页面
  goToUserAgreement: function() {
    wx.navigateTo({
      url: '/pages/userAgreement/userAgreement'
    });
  },

  // 跳转到客服热线页面
  goToCustomerService: function() {
    wx.navigateTo({
      url: '/pages/customerService/customerService'
    });
  },

  // 切换深色模式
  toggleDarkMode: function() {
    const isDarkMode = !this.data.isDarkMode;
    this.setData({ isDarkMode });
    wx.setNavigationBarColor({
      frontColor: isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f7fa'
    });
  }
}); 