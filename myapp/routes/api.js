const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 图片存储目录
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 生成唯一文件名
  }
});

const upload = multer({ storage });

// 存储轮播图数据
let swiperList = [
  { id: 1, image: 'https://example.com/banner1.jpg', novelId: 1 },
  { id: 2, image: 'https://example.com/banner2.jpg', novelId: 2 },
  { id: 3, image: 'https://example.com/banner3.jpg', novelId: 3 }
];

// 存储小说列表数据
let novelList = [
  { id: 1, title: '小说1', cover: 'https://example.com/cover1.jpg' },
  { id: 2, title: '小说2', cover: 'https://example.com/cover2.jpg' },
  { id: 3, title: '小说3', cover: 'https://example.com/cover3.jpg' }
];

// 获取轮播图数据
router.get('/swiper', (req, res) => {
  res.json(swiperList);
});

// 上传轮播图数据
router.post('/swiper', (req, res) => {
  const newSwiper = req.body; // 获取客户端上传的数据
  swiperList.push(newSwiper); // 将新数据添加到数组中
  res.json({ success: true, message: '轮播图数据上传成功', data: newSwiper });
});

// 获取小说列表数据
router.get('/novels', (req, res) => {
  res.json(novelList);
});

// 上传小说列表数据
router.post('/novels', (req, res) => {
  const newNovel = req.body; // 获取客户端上传的数据
  novelList.push(newNovel); // 将新数据添加到数组中
  res.json({ success: true, message: '小说列表数据上传成功', data: newNovel });
});

// 图片上传接口
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: '未上传图片' });
  }

  // 返回图片的访问 URL
  const imageUrl = `http://192.168.110.149:3000/uploads/${req.file.filename}`;
  res.json({ success: true, message: '图片上传成功', url: imageUrl });
});

module.exports = router; 