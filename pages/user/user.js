Page({
  data: {
    user: {
      avatar: 'https://example.com/avatar.jpg',
      name: '用户名',
      level: '/icons/level.png'
    }
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的' // 设置导航栏标题为"我的"
    });
  },

  // 跳转到编辑页面
  goToEdit: function() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    });
  },

  // 跳转到历史页面
  goToHistory: function() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  // 跳转到书签页面
  goToBookmark: function() {
    wx.navigateTo({
      url: '/pages/bookmark/bookmark'
    });
  },

  // 跳转到消息页面
  goToMessage: function() {
    wx.navigateTo({
      url: '/pages/message/message'
    });
  },

  // 跳转到设置页面
  goToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
}); 