// components/nav/nav.js
Component({
  options: {
    // 🔔 允许修改组件内部样式 (默认样式隔离无法修改)
    addGlobalClass: true,
    // 开启多插槽(具名插槽)
    multipleSlots: true
  },
  // 外部样式类
  externalClasses: ['custom-class'],
  // 组件<内部>的数据
  data: {
    // 顶部状态栏高度
    top: 0
  },
  // 组件<外部>的数据，是传进来的，内部只使用，不修改
  properties: {
    back: Boolean,
    delta: {
      type: Number,
      value: 1      // 设置默认值，外部没传递数据时，使用默认值
    }
  },
  // 生命周期
  lifetimes: {
    // 🔴 created 调用 this.setData (几乎不用)
    created() { },
    // 🟢 在组件实例进入页面节点树时执行（常用）
    attached() {
      // 获取系统信息
      const systemInfo = wx.getSystemInfoSync()
      // console.log(systemInfo.statusBarHeight);
      // 更新视图层
      this.setData({
        top: systemInfo.statusBarHeight
      })
    }
  },
  // 组件的事件需要写在 methods 结构中
  methods: {
    onClick() {
      console.log('点击了内部的按钮');
      this.triggerEvent('get-top', this.data.top)
    }
  }
})
