Page({
  data: {
    novelDetail: {
      cover: 'https://funinreadpictures.blob.core.windows.net/images/cover1.jpg',
      title: '',
      author: '',
      summary: '',
      chapters: []
    },
    showAllChapters: false
  },

  onLoad: function(options) {
    const novelId = options.novelId;
    if (novelId) {
      this.fetchNovelDetail(novelId);
    } else {
      console.error('未接收到小说ID');
    }
  },

  fetchNovelDetail: function(novelId) {
    wx.request({
      url: `https://content.funinread.cn/api/novels/${novelId}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            novelDetail: res.data,
            chapters: res.data.chapters || []
          });
        }
      },
      fail: (err) => {
        console.error('获取小说详情失败', err);
      }
    });
  },

  toggleChapters: function() {
    this.setData({
      showAllChapters: !this.data.showAllChapters
    });
  },

  goToChapter: function(e) {
    const chapterId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/content/content?chapterId=' + chapterId
    });
  }
}); 