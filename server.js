const express = require('express');
const app = express();
const port = 3001;
const db = require('./db');

// 允许跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// 模拟书籍数据
const books = [
  { id: 1, title: '小说1', author: '作者1', cover: 'https://example.com/cover1.jpg', category: '玄幻' },
  { id: 2, title: '小说2', author: '作者2', cover: 'https://example.com/cover2.jpg', category: '都市' }
];

// 获取书籍列表
app.get('/api/books', async (req, res) => {
  try {
    const [books] = await db.query('SELECT * FROM books');
    res.json(books);
  } catch (err) {
    console.error('获取书籍列表失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取书籍详情
app.get('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const [book] = await db.query('SELECT * FROM books WHERE id = ?', [bookId]);
    if (book.length > 0) {
      res.json(book[0]);
    } else {
      res.status(404).json({ message: '书籍未找到' });
    }
  } catch (err) {
    console.error('获取书籍详情失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 搜索书籍
app.get('/api/books/search', (req, res) => {
  const keyword = req.query.keyword;
  const results = books.filter(b => b.title.includes(keyword) || b.author.includes(keyword));
  res.json(results);
});

// 按分类获取书籍
app.get('/api/books/category/:category', (req, res) => {
  const category = req.params.category;
  const results = books.filter(b => b.category === category);
  res.json(results);
});

// 添加书籍
app.post('/api/books', async (req, res) => {
  const { title, author, cover, summary, category } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO books (title, author, cover, summary, category) VALUES (?, ?, ?, ?, ?)',
      [title, author, cover, summary, category]
    );
    res.json({ id: result.insertId, message: '书籍添加成功' });
  } catch (err) {
    console.error('添加书籍失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新书籍
app.put('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, cover, summary, category } = req.body;
  try {
    await db.query(
      'UPDATE books SET title = ?, author = ?, cover = ?, summary = ?, category = ? WHERE id = ?',
      [title, author, cover, summary, category, bookId]
    );
    res.json({ message: '书籍更新成功' });
  } catch (err) {
    console.error('更新书籍失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除书籍
app.delete('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    await db.query('DELETE FROM books WHERE id = ?', [bookId]);
    res.json({ message: '书籍删除成功' });
  } catch (err) {
    console.error('删除书籍失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 用户注册
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    res.json({ id: result.insertId, message: '用户注册成功' });
  } catch (err) {
    console.error('用户注册失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 用户登录
app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (user.length > 0) {
      res.json({ message: '登录成功', user: user[0] });
    } else {
      res.status(401).json({ message: '用户名或密码错误' });
    }
  } catch (err) {
    console.error('用户登录失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取阅读记录
app.get('/api/reading-history/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [history] = await db.query('SELECT * FROM reading_history WHERE user_id = ?', [userId]);
    res.json(history);
  } catch (err) {
    console.error('获取阅读记录失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取用户列表
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    console.error('获取用户列表失败', err);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器正在运行，访问地址：http://localhost:${port}`);
});

db.query('SELECT 1 + 1 AS solution')
  .then(([rows]) => {
    console.log('数据库连接成功，结果为：', rows[0].solution);
  })
  .catch((err) => {
    console.error('数据库连接失败', err);
  }); 