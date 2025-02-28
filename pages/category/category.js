Page({
  data: {
    categories: [
      {
        id: 1,
        name: '玄幻',
        icon: 'https://funinreadpictures.blob.core.windows.net/images/1740398795998821.jpg'
      },
      {
        id: 2,
        name: '都市',
        icon: 'https://example.com/icon2.png'
      },
      {
        id: 3,
        name: '历史',
        icon: 'https://example.com/icon3.png'
      },
      {
        id: 4,
        name: '科幻',
        icon: 'https://example.com/icon4.png'
      },
      {
        id: 5,
        name: '游戏',
        icon: 'https://example.com/icon5.png'
      },
      {
        id: 6,
        name: '武侠',
        icon: 'https://example.com/icon6.png'
      },
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
    ]
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '分类' // 设置导航栏标题为分类
    });
  },

  // 跳转到分类详情页面
  goToCategoryDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    const category = this.data.categories.find(item => item.id === id);
    wx.setNavigationBarTitle({
      title: category.name // 设置导航栏标题为当前分类名称
    });
    wx.navigateTo({
      url: `/pages/categoryDetail/categoryDetail?id=${id}`
    });
  },

  // 处理搜索事件
  onSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  }
}); 