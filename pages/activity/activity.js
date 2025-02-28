Page({
  data: {
    activityImages: [
      'https://funinreadpictures.blob.core.windows.net/images/1740398795998821.jpg',
      'https://example.com/activity2.jpg',
      'https://example.com/activity3.jpg',
      'https://example.com/activity4.jpg'
    ]
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '活动' // 设置导航栏标题为活动
    });
  }
}); 