Page({
  data: {
    categoryId: null,
    categoryName: '',
    novels: [
      {
        id: 1,
        title: '小说1',
        cover: 'https://example.com/cover1.jpg',
        author: '作者1',
        description: '这是小说1的简介，内容非常精彩，值得一读。'
      },
      {
        id: 2,
        title: '小说2',
        cover: 'https://example.com/cover2.jpg',
        author: '作者2',
        description: '这是小说2的简介，内容非常精彩，值得一读。'
      },
      {
        id: 3,
        title: '小说3',
        cover: 'https://example.com/cover3.jpg',
        author: '作者3',
        description: '这是小说3的简介，内容非常精彩，值得一读。'
      },
      {
        id: 4,
        title: '小说4',
        cover: 'https://example.com/cover4.jpg',
        author: '作者4',
        description: '这是小说4的简介，内容非常精彩，值得一读。'
      }
    ]
  },

  onLoad: function(options) {
    const { categoryId, categoryName } = options;
    this.setData({
      categoryId,
      categoryName
    });
    wx.setNavigationBarTitle({
      title: categoryName // 设置导航栏标题为分类名称
    });
  },

  // 跳转到小说详情页面
  goToNovelDetail: function(e) {
    const novelId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/novelDetail/novelDetail?novelId=${novelId}`
    });
  },

  // 处理搜索事件
  onSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  }
}); 