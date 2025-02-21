Page({
  data: {
    novelDetail: {},
    showAllChapters: false
  },

  onLoad: function(options) {
    const novelId = options.novelId;
    this.fetchNovelDetail(novelId);
  },

  fetchNovelDetail: function(novelId) {
    // 这里应该是从服务器获取小说详情的逻辑
    // 为了示例，我们使用假数据
    const novelList = [
      {
        id: 1,
        title: "小说1",
        author: "作者1",
        cover: "https://example.com/cover1.jpg",
        summary: "这是一本精彩的小说，情节跌宕起伏……",
        chapters: [
          { id: 1, title: '第一章' },
          { id: 2, title: '第二章' }
        ]
      }
    ];
    
    const novelDetail = novelList.find(novel => novel.id == novelId);
    this.setData({
      novelDetail: novelDetail
    });
  },

  toggleChapters: function() {
    this.setData({
      showAllChapters: !this.data.showAllChapters
    });
  },

  goToChapter: function(e) {
    const chapterId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/content/content?chapterId=' + chapterId
    });
  }
}); 