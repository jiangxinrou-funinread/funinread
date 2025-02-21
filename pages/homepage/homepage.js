Page({
  data: {
      categoryList: [
          {name: "玄幻"},
          {name: "言情"},
          {name: "武侠"},
          {name: "科幻"}
      ],
      hotNovelList: [
          {
              id: 1,
              title: "热门小说1",
              author: "作者1",
              cover: "https://example.com/cover1.jpg"
          },
          {
              id: 2,
              title: "热门小说2",
              author: "作者2",
              cover: "https://example.com/cover2.jpg"
          }
      ]
  },
  onSearchInput: function (e) {
      // 这里可以处理搜索输入的逻辑
  },
  onSearch: function () {
      // 这里可以处理搜索按钮点击的逻辑
  }
})