// postDetail.js
Page({
  data: {
    post: {
      id: 0,
      title: '示例帖子标题',
      author: '示例作者',
      authorAvatar: '/path/to/author/avatar.jpg', // 头像路径
      coverImage: '/path/to/cover/image.jpg', // 封面图路径
      content: '这里是帖子内容，可以很长很长...',
      comments: []
    },
    commentInput: ''
  },
  onLoad: function(options) {
    // 假设从上一个页面传来的postId
    const postId = options.id;
    // 这里应该是从服务器获取帖子详情的逻辑
    // 为了示例，我们使用假数据
    this.setData({
      post: {
        id: postId,
        title: '示例帖子标题',
        author: '示例作者',
        content: '这里是帖子内容，可以很长很长...',
        comments: [
          { id: 1, author: '评论者A', content: '第一条评论' },
          { id: 2, author: '评论者B', content: '第二条评论' }
        ]
      }
    });
  },
  // 绑定评论输入
  bindCommentInput: function(e) {
    this.setData({
      commentInput: e.detail.value
    });
  },
  // 提交评论
  submitComment: function() {
    if (this.data.commentInput.trim() === '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
      return;
    }
    // 创建新的评论对象
    const newComment = {
      id: new Date().getTime(),
      author: '当前用户', // 这里应该是动态获取当前用户名
      content: this.data.commentInput
    };
    // 更新评论列表
    const comments = this.data.post.comments;
    comments.push(newComment);
    this.setData({
      'post.comments': comments,
      commentInput: '' // 清空评论输入框
    });
    // 这里应该是发送评论到服务器的逻辑
    // 为了示例，我们只是更新了本地数据
    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  }
});
