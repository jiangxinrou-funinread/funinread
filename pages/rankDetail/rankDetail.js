Page({
  data: {
    rankTypeId: null,
    rankTypeName: '',
    novels: [
      { id: 1, title: '小说1', author: '作者1', cover: 'https://example.com/cover1.jpg' },
      { id: 2, title: '小说2', author: '作者2', cover: 'https://example.com/cover2.jpg' },
      { id: 3, title: '小说3', author: '作者3', cover: 'https://example.com/cover3.jpg' }
    ]
  },

  onLoad: function(options) {
    const { rankTypeId, rankTypeName } = options;
    this.setData({
      rankTypeId,
      rankTypeName
    });
    wx.setNavigationBarTitle({
      title: rankTypeName // 设置导航栏标题为榜单名称
    });
  },

  // 跳转到小说详情页面
  goToNovelDetail: function(e) {
    const novelId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/novelDetail/novelDetail?novelId=${novelId}`
    });
  }
}); 