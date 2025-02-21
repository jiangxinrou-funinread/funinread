Page({
  data: {
    chapters: []
  },
  onLoad: function(options) {
    const novelId = options.id;
    // 根据novelId获取章节列表，以下为示例数据
    this.setData({
      chapters: [
        { id: 1, title: '第一章' },
        { id: 2, title: '第二章' },
        // 更多章节数据
      ]
    });
  },
  goToContent: function(e) {
    const chapterId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/content/content?id=' + chapterId
    });
  }
});
