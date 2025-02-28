Page({
  data: {
    topics: [
      {
        id: 1,
        avatar: 'https://example.com/avatar1.jpg',
        author: '用户1',
        time: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
        title: '讨论话题1',
        content: '这是话题1的内容，欢迎大家讨论。',
        likes: 12,
        comments: 0, // 默认评论数为 0
        isLiked: false
      },
      {
        id: 2,
        avatar: 'https://example.com/avatar2.jpg',
        author: '用户2',
        time: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
        title: '讨论话题2',
        content: '这是话题2的内容，欢迎大家讨论。',
        likes: 8,
        comments: 0, // 默认评论数为 0
        isLiked: false
      },
      {
        id: 3,
        avatar: 'https://example.com/avatar3.jpg',
        author: '用户3',
        time: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
        title: '讨论话题3',
        content: '这是话题3的内容，欢迎大家讨论。',
        likes: 15,
        comments: 0, // 默认评论数为 0
        isLiked: false
      }
    ],
    currentMoreOptionsId: null
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '论坛'
    });

    // 从缓存中加载话题数据
    const topics = wx.getStorageSync('topics') || [];
    // 确保评论数初始默认值为 0
    topics.forEach(topic => {
      if (topic.comments === undefined || topic.comments === null || topic.comments < 0) {
        topic.comments = 0;
      }
    });
    this.setData({
      topics: topics
    });
  },

  // 跳转到话题详情页面
  goToTopicDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    const topic = this.data.topics.find(item => item.id === id);
    wx.navigateTo({
      url: `/pages/topicDetail/topicDetail?id=${id}`,
      events: {
        updateTopic: (updatedTopic) => {
          const topics = this.data.topics.map(item => {
            if (item.id === updatedTopic.id) {
              return updatedTopic;
            }
            return item;
          });
          this.setData({
            topics: topics
          });

          // 更新缓存中的话题数据
          wx.setStorageSync('topics', topics);
        }
      },
      success: (res) => {
        res.eventChannel.emit('topicData', topic);
      }
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
      topics: topics
    });

    // 更新缓存中的话题数据
    wx.setStorageSync('topics', topics);
  },

  // 阻止事件冒泡
  stopPropagation: function(e) {
    e.stopPropagation();
  },

  // 删除帖子
  deleteTopic: function(e) {
    const id = e.currentTarget.dataset.id;
    const topics = this.data.topics.filter(item => item.id !== id);
    this.setData({
      topics: topics
    });

    // 更新缓存中的话题数据
    wx.setStorageSync('topics', topics);

    wx.showToast({
      title: '帖子已删除',
      icon: 'none'
    });
  }
});