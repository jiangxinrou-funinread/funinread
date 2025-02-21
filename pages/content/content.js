Page({
  data: {
    content: ''
  },
  onLoad: function(options) {
    const chapterId = options.id;
    // 根据chapterId获取章节内容，以下为示例数据
    this.setData({
      content: '这里是章节内容...'
    });
  }
});
