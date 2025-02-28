App({
  globalData: {
    userInfo: null, // 用户信息
    apiBaseUrl: 'https://api.funinread.cn/api', // 修改为 API 基础地址
    isLogin: false, // 登录状态
    token: null, // 用户 token
    theme: 'light', // 主题模式
    systemInfo: null // 系统信息
  },

  onLaunch: function() {
    // 初始化时检查登录状态
    this.checkLoginStatus();

    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
      }
    });

    // 监听网络状态变化
    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        wx.showToast({
          title: '网络已断开',
          icon: 'none'
        });
      }
    });
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLogin = true;
      this.globalData.token = token;
    } else {
      this.globalData.isLogin = false;
      this.globalData.token = null;
    }
  },

  // 登录
  login: function(callback) {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: `${this.globalData.apiBaseUrl}/login`,
            method: 'POST',
            data: { code: res.code },
            success: (res) => {
              if (res.data.success) {
                this.globalData.isLogin = true;
                this.globalData.token = res.data.token;
                wx.setStorageSync('token', res.data.token);
                if (callback) callback(true);
              } else {
                if (callback) callback(false);
              }
            }
          });
        } else {
          if (callback) callback(false);
        }
      }
    });
  },

  // 登出
  logout: function() {
    this.globalData.isLogin = false;
    this.globalData.token = null;
    wx.removeStorageSync('token');
  },

  // 切换主题
  switchTheme: function(theme) {
    this.globalData.theme = theme;
    wx.setStorageSync('theme', theme);
  },

  // 显示加载提示
  showLoading: function(title = '加载中') {
    wx.showLoading({
      title: title,
      mask: true
    });
  },

  // 隐藏加载提示
  hideLoading: function() {
    wx.hideLoading();
  },

  // 显示 toast 提示
  showToast: function(title, icon = 'none', duration = 1500) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    });
  }
});
