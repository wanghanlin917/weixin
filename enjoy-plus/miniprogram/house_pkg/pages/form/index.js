// \u4e00-\u9fa5] 中文验证规则
import validate from 'wechat-validate'
Page({
  behaviors: [validate],
  rules:{
    name:[
      {required: true, message: '请填写业主姓名!'},
      {pattern:/^[\u4e00-\u9fa5]{2,4}/,message:"请检查业主姓名是否正确"}
    ],
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请检查手机号码是否正确!' },
    ],
    idcardFrontUrl:[{required:true,message:'请上传省份证人像面'}],
    idcardBackUrl:[{required:true,message:'请上传身份证国徽面'}]
  },
  data: {
    id:undefined,  // 房屋id，编辑时传入,值不会传入到后端
    point:'',
    building:'',
    room:'',
    mobile:'',
    gender:1,
    name:'',   
    idcardFrontUrl: '',
    idcardFront:'',
    idcardBackUrl: '',
    idcardBack:''
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
  onLoad({point,building,room,id}){
    if(id){
      // 有id是编辑
      this.getDetail(id )
      // 修改标题
      wx.setNavigationBarTitle({title:"编辑房屋信息"})

    }else{
      // 无id是添加
      this,this.setData({
        point,building,room
      })
      wx.setNavigationBarTitle({title:"新增房屋信息"})
    }

  },
  async getDetail(id){
    const res = await wx.http.get(`/room/${id}`)
    this.setData({
      ...res.data
    })
  },
 async onSubmit(){
    // 校验所有rules
    const isAllValid = this.validate()
    console.log(isAllValid);
    if(isAllValid === false){
      return 
    }
    // 提交表单
    // eslint-disable-next-line no-unused-vars
    const {__webviewId__,idcardFrontUrl,idcardBackUrl, ...data} = this.data
    await wx.http.post('/room',data)
    // 后退回列表页,后退四级，中间的页面都要销毁
    // 有id表示编辑，后退两级，无id表示添加，后退四级
    wx.navigateBack({delta: data.id ? 2:4})

  },
  async choosePicture(e){
    // 结构出事件参数
    const {type,path} = e.mark
    const {tempFiles} = await wx.chooseMedia({
      count:1,
      mediaType:['image'],
    })
    if(tempFiles[0].size > 4*1024*1024){
        return wx.utils.toast("图片大小不能超过2M")
    }
    console.log("tempFiles",tempFiles);
   const res = await wx.http.upload('/userInfo/upload',{
      name:'file',
      filePath:tempFiles[0].tempFilePath,
    })
    console.log("图片",res);
    console.log(tempFiles[0].tempFilePath);
    this.setData({
      // idcardFrontUrl:res.data.url
      [type]:res.data.url, // 插值语法
      [path]:res.data.localUrl
    })
  }
})
