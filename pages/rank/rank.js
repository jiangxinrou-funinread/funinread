// novelRank.js
Page({
  data: {
    hotNovels: [
      { id: 1, title: '热门小说1', author: '作者1', cover: 'https://example.com/cover1.jpg' },
      { id: 2, title: '热门小说2', author: '作者2', cover: 'https://example.com/cover2.jpg' },
      { id: 3, title: '热门小说3', author: '作者3', cover: 'https://example.com/cover3.jpg' }
    ],
    todayNovels: [
      { id: 4, title: '今日小说1', author: '作者4', cover: 'https://example.com/cover4.jpg' },
      { id: 5, title: '今日小说2', author: '作者5', cover: 'https://example.com/cover5.jpg' },
      { id: 6, title: '今日小说3', author: '作者6', cover: 'https://example.com/cover6.jpg' }
    ],
    completedNovels: [
      { id: 7, title: '完结小说1', author: '作者7', cover: 'https://example.com/cover7.jpg' },
      { id: 8, title: '完结小说2', author: '作者8', cover: 'https://example.com/cover8.jpg' },
      { id: 9, title: '完结小说3', author: '作者9', cover: 'https://example.com/cover9.jpg' }
    ],
    weeklyNovels: [
      { id: 10, title: '每周小说1', author: '作者10', cover: 'https://example.com/cover10.jpg' },
      { id: 11, title: '每周小说2', author: '作者11', cover: 'https://example.com/cover11.jpg' },
      { id: 12, title: '每周小说3', author: '作者12', cover: 'https://example.com/cover12.jpg' }
    ],
    rankTypes: [
      { id: 1, name: '今日榜单' },
      { id: 2, name: '完结榜单' },
      { id: 3, name: '每周榜单' }
    ]
  },
  goToDetail: function(e) {
    var novelId = e.currentTarget.dataset.novelId;
    wx.navigateTo({
      url: '/pages/novelDetail/novelDetail?novelId=' + novelId
    });
  },
  // 跳转到榜单详情页面
  goToRankDetail: function(e) {
    const rankTypeId = e.currentTarget.dataset.id;
    const rankTypeName = this.data.rankTypes.find(rank => rank.id === rankTypeId).name;
    wx.navigateTo({
      url: `/pages/rankDetail/rankDetail?rankTypeId=${rankTypeId}&rankTypeName=${rankTypeName}`
    });
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '榜单' // 设置导航栏标题为榜单
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
