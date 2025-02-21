Page({
  data: {
    topic: {
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
    comments: [
      {
        id: 1,
        avatar: 'https://example.com/avatar2.jpg',
        author: '用户2',
        time: '30分钟前',
        content: '这是一个评论。'
      },
      {
        id: 2,
        avatar: 'https://example.com/avatar3.jpg',
        author: '用户3',
        time: '20分钟前',
        content: '这是另一个评论。'
      }
    ],
    newComment: '' // 用户输入的新评论
  },

  onLoad: function(options) {
    const topicId = options.topicId;
    // 根据 topicId 获取话题详情
    this.setData({
      topic: this.getTopicById(topicId)
    });
  },

  getTopicById: function(topicId) {
    // 模拟获取话题详情
    return {
      id: 1,
      avatar: 'https://example.com/avatar1.jpg',
      author: '用户1',
      time: '1小时前',
      title: '讨论话题1',
      content: '这是话题1的内容，欢迎大家讨论。',
      likes: 12,
      comments: 5,
      isLiked: false
    };
  },

  // 切换点赞状态
  toggleLike: function() {
    const topic = this.data.topic;
    topic.isLiked = !topic.isLiked;
    topic.likes += topic.isLiked ? 1 : -1;
    this.setData({ topic });
  },

  // 处理新评论输入
  onCommentInput: function(e) {
    this.setData({
      newComment: e.detail.value
    });
  },

  // 提交新评论
  submitComment: function() {
    if (!this.data.newComment.trim()) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
      return;
    }

    const newComment = {
      id: this.data.comments.length + 1,
      avatar: 'https://example.com/avatar4.jpg', // 当前用户头像
      author: '当前用户', // 当前用户昵称
      time: '刚刚',
      content: this.data.newComment
    };

    // 更新评论列表
    this.setData({
      comments: [newComment, ...this.data.comments],
      newComment: '' // 清空输入框
    });

    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  }
}); 