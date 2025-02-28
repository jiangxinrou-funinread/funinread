Page({
  data: {
    // 轮播图数据
    swiperList: [
      { id: 1, image: 'https://funinreadpictures.blob.core.windows.net/images/banner1.jpg', novelId: 1 },
      { id: 2, image: 'https://funinreadpictures.blob.core.windows.net/images/banner2.jpg', novelId: 2 },
      { id: 3, image: 'https://funinreadpictures.blob.core.windows.net/images/banner3.jpg', novelId: 3 }
    ],
    // 小说列表数据
    novelList: [
      {
        id: 1,
        title: "小说1",
        author: "作者1",
        cover: "https://funinreadpictures.blob.core.windows.net/images/cover1.jpg",
        summary: "这是一本精彩的小说，情节跌宕起伏……",
        chapters: [
          { id: 1, title: '第一章' },
          { id: 2, title: '第二章' }
        ]
      },
      {
        id: 2,
        title: "小说2",
        author: "作者2",
        cover: "https://funinreadpictures.blob.core.windows.net/images/cover2.jpg",
        summary: "这本小说充满了奇幻元素……",
        chapters: [
          { id: 1, title: '第一章' },
          { id: 2, title: '第二章' }
        ]
      },
      {
        id: 3,
        title: "小说3",
        author: "作者3",
        cover: "https://example.com/cover3.jpg",
        summary: "这本小说充满了奇幻元素……"
      },
      {
        id: 4,
        title: "小说4",
        author: "作者4",
        cover: "https://example.com/cover4.jpg",
        summary: "这本小说充满了奇幻元素……"
      },
      {
        id: 5,
        title: "小说5",
        author: "作者5",
        cover: "https://example.com/cover5.jpg",
        summary: "这本小说充满了奇幻元素……"
      },
      {
        id: 6,
        title: "小说6",
        author: "作者6",
        cover: "https://example.com/cover6.jpg",
        summary: "这本小说充满了奇幻元素……"
      }
    ]
  },

  // 跳转到小说详情页
  goToNovelDetail: function(e) {
    const novelId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/novelDetail/novelDetail?novelId=' + novelId
    });
  },

  // 轮播图点击事件
  swiperTap: function(e) {
    const novelId = e.currentTarget.dataset.novelId;
    wx.navigateTo({
      url: '/pages/novelDetail/novelDetail?novelId=' + novelId
    });
  },

  // 获取轮播图数据
  fetchSwiperData: function() {
    wx.request({
      url: 'https://api.funinread.cn/api/swiper',
      method: 'GET',
      success: (res) => {
        console.log('轮播图数据:', res.data); // 打印数据
        this.setData({
          swiperList: res.data
        });
      },
      fail: (err) => {
        console.error('获取轮播图数据失败', err);
      }
    });
  }
})