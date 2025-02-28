Page({
  data: {
    topic: {
      avatar: '', // 发布者头像
      author: '', // 发布者昵称
      time: '', // 发布时间
      title: '', // 帖子标题
      content: '', // 帖子内容
      topic: '', // 话题标签
      isLiked: false, // 是否点赞
      likes: 0, // 点赞数
      comments: 0 // 评论数
    },
    comments: [], // 评论列表
    newComment: '', // 新评论内容
    showReplyInput: false, // 是否显示回复输入框
    newReply: '', // 新回复内容
    replyToCommentId: null, // 当前回复的评论 ID
    isInputExpanded: false // 是否展开评论输入框
  },

  onLoad: function(options) {
    const topicId = options.id;
    const eventChannel = this.getOpenerEventChannel();

    // 监听论坛页面传递的数据
    eventChannel.on('topicData', (topic) => {
      // 确保评论数初始默认值为 0
      if (topic.comments === undefined || topic.comments === null || topic.comments < 0) {
        topic.comments = 0;
      }
      this.setData({
        topic: topic
      });
    });

    // 加载评论数据
    const comments = wx.getStorageSync(`comments_${topicId}`) || [];
    this.setData({
      comments: comments
    });
  },

  // 切换点赞状态
  toggleLike: function() {
    const topic = this.data.topic;
    topic.isLiked = !topic.isLiked;
    topic.likes += topic.isLiked ? 1 : -1;
    this.setData({
      topic: topic
    });

    // 更新缓存中的话题数据
    const topics = wx.getStorageSync('topics') || [];
    const index = topics.findIndex(item => item.id === topic.id);
    if (index !== -1) {
      topics[index] = topic;
      wx.setStorageSync('topics', topics);
    }

    // 通知论坛页面更新数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('updateTopic', topic);
  },

  // 输入评论内容
  onCommentInput: function(e) {
    this.setData({
      newComment: e.detail.value
    });
  },

  // 展开评论输入框
  expandInput: function() {
    this.setData({
      isInputExpanded: true
    });
  },

  // 收起评论输入框
  shrinkInput: function() {
    this.setData({
      isInputExpanded: false
    });
  },

  // 提交评论
  submitComment: function() {
    if (!this.data.newComment.trim()) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
      return;
    }

    const now = new Date();
    const time = now.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }); // AM/PM 格式

    const newComment = {
      id: new Date().getTime(),
      avatar: 'https://example.com/avatar.jpg',
      author: '当前用户',
      time: time, // 使用 AM/PM 格式
      content: this.data.newComment
    };

    const comments = this.data.comments;
    comments.push(newComment);

    // 更新评论数
    const topic = this.data.topic;
    topic.comments += 1;
    if (topic.comments < 0) {
      topic.comments = 0;
    }

    this.setData({
      comments: comments,
      topic: topic,
      newComment: '',
      isInputExpanded: false
    });

    // 更新缓存中的评论数据
    wx.setStorageSync(`comments_${this.data.topic.id}`, comments);

    // 更新缓存中的话题数据
    const topics = wx.getStorageSync('topics') || [];
    const index = topics.findIndex(item => item.id === topic.id);
    if (index !== -1) {
      topics[index] = topic;
      wx.setStorageSync('topics', topics);
    }

    // 通知论坛页面更新数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('updateTopic', topic);
  },

  // 显示回复输入框
  showReplyInput: function(e) {
    const commentId = e.currentTarget.dataset.id;
    this.setData({
      showReplyInput: true,
      replyToCommentId: commentId
    });
  },

  // 输入回复内容
  onReplyInput: function(e) {
    this.setData({
      newReply: e.detail.value
    });
  },

  // 提交回复
  submitReply: function() {
    if (!this.data.newReply.trim()) {
      wx.showToast({
        title: '回复内容不能为空',
        icon: 'none'
      });
      return;
    }

    const now = new Date();
    const time = now.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }); // AM/PM 格式

    const newReply = {
      id: new Date().getTime(),
      avatar: 'https://example.com/avatar.jpg',
      author: '当前用户',
      time: time, // 使用 AM/PM 格式
      content: this.data.newReply
    };

    const comments = this.data.comments.map(item => {
      if (item.id === this.data.replyToCommentId) {
        item.replies = item.replies || [];
        item.replies.push(newReply);
      }
      return item;
    });

    this.setData({
      comments: comments,
      newReply: '',
      showReplyInput: false
    });

    // 更新缓存中的评论数据
    wx.setStorageSync(`comments_${this.data.topic.id}`, comments);
  },

  // 删除评论
  deleteComment: function(e) {
    const commentId = e.currentTarget.dataset.id;
    const comments = this.data.comments.filter(item => item.id !== commentId);

    // 更新评论数
    const topic = this.data.topic;
    topic.comments -= 1;

    this.setData({
      comments: comments,
      topic: topic
    });

    // 更新缓存中的评论数据
    wx.setStorageSync(`comments_${this.data.topic.id}`, comments);

    // 更新缓存中的话题数据
    const topics = wx.getStorageSync('topics') || [];
    const index = topics.findIndex(item => item.id === topic.id);
    if (index !== -1) {
      topics[index] = topic;
      wx.setStorageSync('topics', topics);
    }

    wx.showToast({
      title: '评论已删除',
      icon: 'none'
    });
  },

  // 删除帖子
  deleteTopic: function() {
    const id = this.data.topic.id;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; // 获取上一个页面（论坛页）

    // 更新论坛页的话题列表
    const topics = prevPage.data.topics.filter(item => item.id !== id);
    prevPage.setData({
      topics: topics
    });

    // 更新缓存中的话题数据
    wx.setStorageSync('topics', topics);

    // 返回论坛页
    wx.navigateBack();

    wx.showToast({
      title: '帖子已删除',
      icon: 'none'
    });
  }
}); 