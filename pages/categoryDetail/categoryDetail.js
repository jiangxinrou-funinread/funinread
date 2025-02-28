Page({
  data: {
    categoryId: null,
    categoryName: '',
    novels: [
      {
        id: 1,
        title: '小说1',
        cover: 'https://funinreadpictures.blob.core.windows.net/images/1740398795998821.jpg',
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
    const id = options.id;
    const category = this.getCategoryById(id);
    this.setData({
      categoryId: id,
      categoryName: category.name
    });

    wx.setNavigationBarTitle({
      title: category.name // 设置导航栏标题为当前分类名称
    });

    // 加载书籍数据
    this.loadBooks(id);
  },

  // 根据 ID 获取分类信息
  getCategoryById: function(id) {
    const categories = [
      { id: 1, name: '玄幻' },
      { id: 2, name: '都市' },
      { id: 3, name: '历史' },
      { id: 4, name: '科幻' },
      { id: 5, name: '游戏' },
      { id: 6, name: '武侠' },
      { id: 7, name: '奇幻' },
      { id: 8, name: '仙侠' },
      { id: 9, name: '言情' },
      { id: 10, name: '军事' },
      { id: 11, name: '体育' },
      { id: 12, name: '灵异' },
      { id: 13, name: '悬疑' },
      { id: 14, name: 'ABO' },
      { id: 15, name: '耽美' },
      { id: 16, name: '百合' },
      { id: 17, name: 'BE' },
      { id: 18, name: 'HE' },
      { id: 19, name: '穿越' },
      { id: 20, name: '重生' },
      { id: 21, name: '种田' },
      { id: 22, name: '骨科' },
      { id: 23, name: '养成' }
    ];
    return categories.find(item => item.id === parseInt(id));
  },

  // 加载书籍数据
  loadBooks: function(categoryId) {
    // 模拟加载书籍数据
    const books = [
      { id: 1, title: '书籍1', author: '作者1', cover: 'https://example.com/cover1.jpg' },
      { id: 2, title: '书籍2', author: '作者2', cover: 'https://example.com/cover2.jpg' },
      { id: 3, title: '书籍3', author: '作者3', cover: 'https://example.com/cover3.jpg' }
    ];
    this.setData({
      books: books
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