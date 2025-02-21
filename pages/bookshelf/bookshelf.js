Page({
  data: {
    lastReadBook: {
      id: 1,
      title: '上次阅读的小说',
      author: '作者',
      cover: 'https://example.com/cover1.jpg',
      progress: 45, // 阅读进度百分比
      lastChapter: '第45章' // 上次阅读的章节
    },
    books: [
      {
        id: 1,
        title: '小说1',
        author: '作者1',
        cover: 'https://example.com/cover1.jpg',
        progress: 45
      },
      {
        id: 2,
        title: '小说2',
        author: '作者2',
        cover: 'https://example.com/cover2.jpg',
        progress: 78
      },
      {
        id: 3,
        title: '小说3',
        author: '作者3',
        cover: 'https://example.com/cover3.jpg',
        progress: 12
      },
      {
        id: 4,
        title: '小说4',
        author: '作者4',
        cover: 'https://example.com/cover4.jpg',
        progress: 60
      },
      {
        id: 5,
        title: '小说5',
        author: '作者5',
        cover: 'https://example.com/cover5.jpg',
        progress: 90
      }
    ]
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '书架' // 设置导航栏标题为书架
    });
  },

  // 继续阅读上次阅读的书籍
  continueReading: function() {
    const bookId = this.data.lastReadBook.id;
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
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