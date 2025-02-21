Page({
  data: {
    topics: [
      {
        id: 1,
        avatar: 'https://example.com/avatar1.jpg',
        author: '用户1',
        time: '1小时前',
        title: '讨论话题1',
        content: '这是话题1的内容，欢迎大家讨论。',
        likes: 12,
        comments: 5,
        isLiked: false
      },
      {
        id: 2,
        avatar: 'https://example.com/avatar2.jpg',
        author: '用户2',
        time: '2小时前',
        title: '讨论话题2',
        content: '这是话题2的内容，欢迎大家讨论。',
        likes: 8,
        comments: 3,
        isLiked: false
      },
      {
        id: 3,
        avatar: 'https://example.com/avatar3.jpg',
        author: '用户3',
        time: '3小时前',
        title: '讨论话题3',
        content: '这是话题3的内容，欢迎大家讨论。',
        likes: 8,
        comments: 3,
        isLiked: false
      },
      {
        id: 4,
        avatar: 'https://example.com/avatar4.jpg',
        author: '用户4',
        time: '4小时前',
        title: '讨论话题4',
        content: '这是话题4的内容，欢迎大家讨论。',
        likes: 8,
        comments: 3,
        isLiked: false
      },
      {
        id: 5,
        avatar: 'https://example.com/avatar5.jpg',
        author: '用户5',
        time: '5小时前',
        title: '讨论话题5',
        content: '这是话题5的内容，欢迎大家讨论。',
        likes: 8,
        comments: 3,
        isLiked: false
      }
      
    ],
    currentMoreOptionsId: null
  },

  // 显示更多选项
  showMoreOptions: function(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      currentMoreOptionsId: this.data.currentMoreOptionsId === id ? null : id
    });
  },

  // 阻止事件冒泡
  stopPropagation: function(e) {
    e.stopPropagation();
  },

  // 标记为不感兴趣
  markAsNotInterested: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '已标记为不感兴趣',
      icon: 'none'
    });
    this.setData({
      currentMoreOptionsId: null
    });
  },

  // 内容反馈
  reportContent: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '已提交内容反馈',
      icon: 'none'
    });
    this.setData({
      currentMoreOptionsId: null
    });
  },

  // 跳转到话题详情页面
  goToTopicDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/topicDetail/topicDetail?id=${id}`
    });
  },

  // 跳转到发布新话题页面
  goToAddTopic: function() {
    wx.navigateTo({
      url: '/pages/addTopic/addTopic'
    });
  },

  // 切换点赞状态
  toggleLike: function(e) {
    const id = e.currentTarget.dataset.id;
    const topics = this.data.topics.map(item => {
      if (item.id === id) {
        item.isLiked = !item.isLiked;
        item.likes += item.isLiked ? 1 : -1;
      }
      return item;
    });
    this.setData({
      topics
    });
  }
});