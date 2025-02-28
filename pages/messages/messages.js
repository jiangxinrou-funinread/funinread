Page({
  data: {
    messages: [] // 消息列表
  },

  onLoad: function() {
    // 从缓存中加载消息数据
    const messages = wx.getStorageSync('messages') || [];
    this.setData({
      messages: messages
    });

    // 标记所有消息为已读
    const readMessages = messages.map(item => {
      item.isRead = true;
      return item;
    });
    wx.setStorageSync('messages', readMessages);

    // 更新"我的"页面中的小红点状态
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    if (prevPage && prevPage.route === 'pages/user/user') {
      prevPage.setData({
        hasUnreadMessages: false
      });
    }

    wx.setNavigationBarTitle({
      title: '消息' // 设置导航栏标题为消息
    });
  },

  // 跳转到帖子详情页面
  goToTopicDetail: function(e) {
    const topicId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/topicDetail/topicDetail?id=${topicId}`
    });
  }
}); 