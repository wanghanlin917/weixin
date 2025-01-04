Page({
  // 页面的初始数据
  data: {
    isCheck: false,
    msg: 'hello11',
    isLogin: true,
    isHidden: false,
    // 学生数据
    students: [
      { id: 1, name: '贺洋', age: 20, gender: '男', level: '菜鸟' },
      { id: 2, name: '唐刚', age: 18, gender: '女', level: '笨鸟' },
      { id: 3, name: '常超', age: 20, gender: '女', level: '老鸟' }
    ],
    history: ['苹果', '华为', 'OPPO', '三星']
  }
})