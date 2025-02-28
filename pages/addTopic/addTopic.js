Page({
  data: {
    title: '', // 标题
    content: '', // 正文
    topic: '', // 话题
    showTopicOptions: false, // 是否显示话题选择项
    topicOptions: [
      '玄幻', '都市', '历史', '科幻', '游戏', '武侠', '仙侠', '奇幻', 
      '轻小说', '现实', '军事', '体育', '二次元', '短篇', '古代言情', 
      '现代言情', '青春校园', '幻想言情', '悬疑灵异', '科幻空间', 
      '游戏竞技', 'N次元', '其他'
    ], // 话题选择范围（与小说分类一致）
    filteredTopicOptions: [] // 过滤后的话题选择项
  },

  // 更新标题
  updateTitle: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  // 更新正文
  updateContent: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  // 更新话题
  updateTopic: function(e) {
    const input = e.detail.value;
    this.setData({
      topic: input,
      showTopicOptions: input.trim() !== '', // 输入不为空时显示选择项
      filteredTopicOptions: this.data.topicOptions
        .filter(item => item.includes(input)) // 过滤匹配项
        .slice(0, 5) // 最多显示5个
    });
  },

  // 选择话题
  selectTopic: function(e) {
    const topic = e.currentTarget.dataset.topic;
    this.setData({
      topic: topic,
      showTopicOptions: false // 选择后隐藏选择项
    });
  },

  // 提交话题
  submitTopic: function() {
    if (!this.data.title.trim() || !this.data.content.trim() || !this.data.topic.trim()) {
      wx.showToast({
        title: '标题、正文和话题不能为空',
        icon: 'none'
      });
      return;
    }

    // 获取当前时间
    const now = new Date();
    const time = now.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }); // AM/PM 格式

    // 将话题名附加到正文后面
    const contentWithTopic = `${this.data.content}\n#${this.data.topic}`;

    // 创建新话题对象
    const newTopic = {
      id: new Date().getTime(), // 使用时间戳作为唯一 ID
      avatar: 'https://example.com/avatar.jpg', // 当前用户头像
      author: '当前用户', // 当前用户名
      time: time,
      title: this.data.title,
      content: contentWithTopic, // 使用附加话题后的正文
      topic: this.data.topic,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    // 获取页面栈
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; // 上一个页面（论坛页）

    // 更新论坛页的话题列表
    const topics = [newTopic, ...prevPage.data.topics];
    prevPage.setData({
      topics: topics
    });

    // 更新缓存中的话题数据
    wx.setStorageSync('topics', topics);

    // 返回论坛页
    wx.navigateBack();

    wx.showToast({
      title: '发布成功',
      icon: 'success'
    });
  }
});