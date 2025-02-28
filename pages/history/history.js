Page({
  data: {
    historyBooks: [] // 历史阅读书籍列表
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '历史' // 设置导航栏标题为历史
    });

    // 从缓存中加载历史阅读书籍数据
    const historyBooks = wx.getStorageSync('historyBooks') || [];
    this.setData({
      historyBooks: historyBooks
    });
  },

  // 跳转到书籍详情页面
  goToBookDetail: function(e) {
    const bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
    });
  }
}); 