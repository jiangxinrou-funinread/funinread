const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const path = require('path');

// 解析 JSON 请求体
app.use(express.json());

// 允许跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 设置静态文件目录
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 使用 API 路由
app.use('/api', apiRouter);

// 启动服务器
const port = 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://192.168.110.149:${port}`);
}); 