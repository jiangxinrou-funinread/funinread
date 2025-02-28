Page({
  data: {
    currentTab: 0, // 当前选中的栏目
    currentButton: '', // 当前选中的按钮
    swiperList: [],
    todayRecommend: [
      { id: 1, title: '小说1', cover: 'https://funinreadpictures.blob.core.windows.net/images/cover1.jpg' },
      { id: 2, title: '小说2', cover: 'https://funinreadpictures.blob.core.windows.net/images/cover2.jpg' },
      { id: 3, title: '小说3', cover: 'https://funinreadpictures.blob.core.windows.net/images/cover3.jpg' }
    ],
    hotNovelList: [
      { id: 4, title: '小说4', cover: 'https://funinreadpictures.blob.core.windows.net/images/cover4.jpg' },
      { id: 5, title: '小说5', cover: 'https://funinreadpictures.blob.core.windows.net/images/cover5.jpg' },
      { id: 6, title: '小说6', cover: 'https://funinreadpictures.blob.core.windows.net/images/cover6.jpg' }
    ],
    novelList: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '首页' // 设置导航栏标题为首页
    });
    this.fetchSwiperData();
    this.fetchNovelData();
  },

  // 获取轮播图数据
  fetchSwiperData: function() {
    wx.request({
      url: 'https://content.funinread.cn/api/swiper',
      method: 'GET',
      success: (res) => {
        this.setData({
          swiperList: res.data
        });
      },
      fail: (err) => {
        console.error('获取轮播图数据失败', err);
      }
    });
  },

  // 获取小说列表数据
  fetchNovelData: function() {
    wx.request({
      url: 'https://api.funinread.cn/api/novels',
      method: 'GET',
      success: (res) => {
        this.setData({
          novelList: res.data
        });
      },
      fail: (err) => {
        console.error('获取小说列表数据失败', err);
      }
    });
  },

  // 切换栏目
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  // 轮播图切换
  swiperChange: function(e) {
    const current = e.detail.current;
    this.setData({
      currentTab: current
    });
  },

  // 跳转到分类页面
  goToCategory: function() {
    wx.setNavigationBarTitle({
      title: '分类' // 设置导航栏标题为分类
    });
    wx.navigateTo({
      url: '/pages/category/category'
    });
  },

  // 跳转到活动页面
  goToActivity: function() {
    wx.setNavigationBarTitle({
      title: '活动' // 设置导航栏标题为活动
    });
    wx.navigateTo({
      url: '/pages/activity/activity'
    });
  },

  // 跳转到榜单页面
  goToRank: function() {
    wx.setNavigationBarTitle({
      title: '榜单' // 设置导航栏标题为榜单
    });
    wx.navigateTo({
      url: '/pages/rank/rank'
    });
  },

  // 跳转到今日推荐页面
  goToTodayRecommend: function() {
    wx.navigateTo({
      url: '/pages/todayRecommend/todayRecommend'
    });
  },

  // 跳转到热门推荐页面
  goToHotRecommend: function() {
    wx.navigateTo({
      url: '/pages/hotRecommend/hotRecommend'
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