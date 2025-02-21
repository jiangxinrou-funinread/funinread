Page({
  data: {
    categories: [
      { id: 1, name: '玄幻' },
      { id: 2, name: '奇幻' },
      { id: 3, name: '武侠' },
      { id: 4, name: '仙侠' },
      { id: 5, name: '都市' },
      { id: 6, name: '言情' },
      { id: 7, name: '历史' },
      { id: 8, name: '军事' },
      { id: 9, name: '游戏' },
      { id: 10, name: '体育' },
      { id: 11, name: '科幻' },
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
    ]
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '分类' // 设置导航栏标题为分类
    });
  },

  // 跳转到分类详情页面
  goToCategoryDetail: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    const categoryName = this.data.categories.find(category => category.id === categoryId).name;
    console.log('跳转到分类详情页面:', categoryId, categoryName); // 调试信息
    wx.navigateTo({
      url: `/pages/categoryDetail/categoryDetail?categoryId=${categoryId}&categoryName=${categoryName}`
    });
  },

  // 处理搜索事件
  onSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  }
}); 