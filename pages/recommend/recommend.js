Page({
  data: {
    // 轮播图数据
    swiperList: [
      { id: 1, image: 'https://example.com/banner1.jpg', novelId: 1 },
      { id: 2, image: 'https://example.com/banner2.jpg', novelId: 2 },
      { id: 3, image: 'https://example.com/banner3.jpg', novelId: 3 }
    ],
    // 小说列表数据
    novelList: [
      {
        id: 1,
        title: "小说1",
        author: "作者1",
        cover: "https://example.com/cover1.jpg",
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
        cover: "https://example.com/cover2.jpg",
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
  }
})