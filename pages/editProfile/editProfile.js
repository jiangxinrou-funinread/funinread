Page({
  data: {
    userInfo: {
      name: '用户名', // 昵称
      gender: '男', // 性别
      age: 18, // 年龄
      constellation: '', // 星座
      bio: '这个人很懒，什么都没有留下。' // 个人简介
    },
    ageRange: Array.from({ length: 151 }, (_, i) => i), // 0 到 150 岁的数组
    constellations: [
      '白羊座', '金牛座', '双子座', '巨蟹座', 
      '狮子座', '处女座', '天秤座', '天蝎座', 
      '射手座', '摩羯座', '水瓶座', '双鱼座'
    ], // 十二星座
    constellationIndex: 0 // 当前选择的星座索引
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '编辑' // 设置导航栏标题为编辑
    });

    // 从缓存中加载用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userInfo: userInfo,
      constellationIndex: this.data.constellations.indexOf(userInfo.constellation) || 0
    });
  },

  // 更新昵称
  updateName: function(e) {
    this.setData({
      'userInfo.name': e.detail.value
    });
  },

  // 更新性别
  updateGender: function(e) {
    const gender = e.detail.value === '0' ? '男' : '女'; // 确保显示为"男"或"女"
    this.setData({
      'userInfo.gender': gender
    });
  },

  // 更新年龄
  updateAge: function(e) {
    this.setData({
      'userInfo.age': parseInt(e.detail.value) // 将字符串转换为数字
    });
  },

  // 更新星座
  updateConstellation: function(e) {
    const index = e.detail.value;
    this.setData({
      constellationIndex: index,
      'userInfo.constellation': this.data.constellations[index]
    });
  },

  // 更新个人简介
  updateBio: function(e) {
    this.setData({
      'userInfo.bio': e.detail.value
    });
  },

  // 保存用户信息
  saveProfile: function() {
    // 将用户信息保存到缓存
    wx.setStorageSync('userInfo', this.data.userInfo);

    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });

    // 返回上一页
    wx.navigateBack();
  },

  // 更新用户信息
  updateUserInfo: function(e) {
    const { field } = e.currentTarget.dataset;
    const value = e.detail.value;
    this.setData({
      [`userInfo.${field}`]: value
    });
  }
}); 