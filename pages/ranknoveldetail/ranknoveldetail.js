// novelDetail.js
Page({
  data: {
    novelDetail: {}
  },
  onLoad: function(options) {
    var novelId = options.novelId;
    this.fetchNovelDetail(novelId);
  },
  fetchNovelDetail: function(novelId) {
    var that = this;
    wx.request({
      url: 'https://yourserver.com/api/noveldetail?novelId=' + novelId,
      success: function(res) {
        if (res.statusCode === 200 && res.data) {
          that.setData({
            novelDetail: res.data
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      }
    });
  }
});
