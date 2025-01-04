Page({
  // 用于页面渲染的数据
  data: {
    books: [],
    avatar: ''
  },
  // 获取列表
  onGetList() {
    // 加载提示
    wx.showLoading({ title: '加载中', mask: true })
    // 内置API-网络请求
    wx.request({
      // 请求地址
      url: 'https://hmajax.itheima.net/api/books',
      // 请求方法
      method: 'GET',
      // 请求参数
      data: {
        creator: 'zhangsan'
      },
      // 请求成功执行的回调函数，🔔 注意使用箭头函数
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          books: res.data.data
        })
        console.log(this.data.books);
        // 轻提示框-会自动隐藏
        wx.showToast({ title: '获取成功', mask: false, duration: 2000, icon: 'none' })
      },
      // 请求完成
      fail: () => {
        // 隐藏加载框
        wx.hideLoading()
      }
    })
  },
  // 存储数据
  onSave() {
    // 存储数据-可以存字符串，数字，布尔值，数值，对象
    wx.setStorageSync('name', '李四')
    wx.setStorageSync('student', { name: '王五', gender: 18 })

    // 非同步版本写法 - 了解即可
    wx.setStorage({ key: 'name2', data: '王五' })

    wx.showToast({ title: '存储成功' })
  },
  // 读取数据
  onGet() {
    // 获取数据
    const student = wx.getStorageSync('student')

    // 非同步版本写法 - 了解即可
    wx.getStorage({
      key: 'student',
      success: (res) => {
        console.log(res.data);
      }
    })

    // 获取成功或失败提示
    if (student) {
      wx.showToast({ title: '获取成功' })
    } else {
      wx.showToast({ title: '获取失败', icon: 'error' })
    }
  },
  // 删除数据
  onRemove() {
    // 删除指定的一条数据
    wx.removeStorageSync('name')
  },
  // 清空数据
  onClear() {
    // 清空所有本地存储数据
    wx.clearStorageSync()
  },

  // 选择图片
  async onChoose() {
    // 推荐使用 async await 的写法，减少不必要的回调地狱
    const res = await wx.chooseMedia({
      mediaType: ['image'],
      count: 1
    })
    console.log(res);
    this.setData({
      avatar: res.tempFiles[0].tempFilePath
    })
    // 回调函数写法
    // wx.chooseMedia({
    //   // 只允许选择图片
    //   mediaType: ['image'],
    //   // 限制只能选一张图片
    //   count: 1,
    //   success: (res) => {
    //     // console.log(res.tempFiles[0].tempFilePath);
    //     this.setData({
    //       avatar: res.tempFiles[0].tempFilePath
    //     })
    //   }
    // })
  }
})