Page({
  data: {
    user: {
      avatar: 'https://funinreadpictures.blob.core.windows.net/images/default-avatar.png', // 默认头像
      name: '用户名',
      level: 'https://funinreadpictures.blob.core.windows.net/icons/level.png'
    },
    hasUnreadMessages: false, // 是否有未读消息
    messages: [] // 消息列表
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的' // 设置导航栏标题为我的
    });

    // 从缓存中加载用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        'user.name': userInfo.name
      });
    }

    // 从缓存中加载消息数据
    const messages = wx.getStorageSync('messages') || [];
    const hasUnreadMessages = messages.some(item => !item.isRead);
    this.setData({
      messages: messages,
      hasUnreadMessages: hasUnreadMessages
    });
  },

  // 跳转到编辑页面
  goToEdit: function() {
    wx.navigateTo({
      url: '/pages/editProfile/editProfile'
    });
  },

  // 上传头像
  uploadAvatar: function() {
    wx.chooseImage({
      count: 1, // 只能选择一张图片
      sizeType: ['compressed'], // 压缩图片
      sourceType: ['album', 'camera'], // 从相册或相机选择
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]; // 获取临时文件路径

        // 上传图片到服务器
        wx.uploadFile({
          url: 'https://pictures.funinread.cn/api/upload',
          filePath: tempFilePath,
          name: 'avatar',
          success: (res) => {
            console.log('服务器返回的原始数据:', res.data); // 打印原始数据
            try {
              const data = JSON.parse(res.data);
              if (data.success) {
                // 更新头像
                this.setData({
                  'user.avatar': data.url
                });

                // 将头像 URL 保存到缓存
                wx.setStorageSync('userAvatar', data.url);

                wx.showToast({
                  title: '头像上传成功',
                  icon: 'success'
                });
              } else {
                wx.showToast({
                  title: '头像上传失败',
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('解析 JSON 失败:', error);
              wx.showToast({
                title: '服务器返回数据格式错误',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.error('上传失败', err);
            wx.showToast({
              title: '上传失败，请重试',
              icon: 'none'
            });
          }
        });
      }
    });
  },

  // 跳转到消息页面
  goToMessages: function() {
    console.log('跳转到消息页面'); // 调试信息
    wx.navigateTo({
      url: '/pages/messages/messages'
    });
  },

  // 跳转到历史页面
  goToHistory: function() {
    console.log('跳转到历史页面'); // 调试信息
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  // 跳转到用户协议页面
  goToUserAgreement: function() {
    wx.navigateTo({
      url: '/pages/userAgreement/userAgreement'
    });
  },

  // 跳转到客服热线页面
  goToCustomerService: function() {
    wx.navigateTo({
      url: '/pages/customerService/customerService'
    });
  }
});