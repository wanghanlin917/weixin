const utils = {
  // 轻提示
  toast (title = '提示') {
    wx.showToast({
      title,
      mask: true,
      icon: 'none'
    })
  }
}

// 导出
export default utils
