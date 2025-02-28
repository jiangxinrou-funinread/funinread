import API_BASE_URL from '../../config';

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
    books: [],
    page: 1,
    loading: false,
    hasMore: true
  },

  onLoad: function() {
    this.fetchBooks();
    wx.setNavigationBarTitle({
      title: '书架' // 设置导航栏标题为书架
    });
  },

  // 获取书籍列表
  fetchBooks: function() {
    if (this.data.loading || !this.data.hasMore) return;
    this.setData({ loading: true });
    wx.request({
      url: `${API_BASE_URL}/books?page=${this.data.page}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const newBooks = res.data || [];
          this.setData({
            books: this.data.books.concat(newBooks),
            page: this.data.page + 1,
            hasMore: newBooks.length > 0,
            loading: false
          });
        }
      },
      fail: (err) => {
        console.error('获取书籍列表失败', err);
        this.setData({ loading: false });
      }
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