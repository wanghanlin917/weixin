const utils = {
  // 轻提示
  toast (title = '提示') {
    wx.showToast({
      title,
      mask: true,
      icon: 'none'
    })
  },
  /**
   * 日期格式化
   * @param {*} date 
   * @returns 
   */
  formatDate(date){
    date = new Date(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // return [year,month,day].map((v) => (v<10? '0'+v:v)).join('-')
    return `${year}-${month<10? '0'+month : month}-${day < 10 ? '0'+ day: day}`
  },  
}

// 导出
export default utils
