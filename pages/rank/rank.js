// novelRank.js
Page({
  data: {
    novelList: [
      { id: 1, name: '盗墓笔记', author: '南派三叔', cover: 'https://example.com/cover1.jpg' },
      { id: 2, name: '全职高手', author: '蝴蝶蓝', cover: 'https://example.com/cover2.jpg' },
      // ...更多小说数据
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
  }
});
