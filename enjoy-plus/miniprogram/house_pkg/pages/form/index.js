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
    id:'',  // 房屋id，编辑时传入
    point:'',
    building:'',
    room:'',
    mobile:'',
    gender:1,
    name:'',   
    idcardFrontUrl: '',
    idcardBackUrl: '',
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
  onLoad({point,building,room}){
    this,this.setData({
      point,building,room
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
    const {__webviewId__,id, ...data} = this.data
    await wx.http.post('/room',data)
    // 后退回列表页,后退四级，中间的页面都要销毁
    wx.navigateBack({delta:4})

  },
  async choosePicture(e){
    // 结构出事件参数
    const {type} = e.mark
    const {tempFiles} = await wx.chooseMedia({
      count:1,
      mediaType:['image'],
    })
    if(tempFiles[0].size > 2*1024*1024){
        return wx.utils.toast("图片大小不能超过2M")
    }
   const res = await wx.http.upload('/userInfo/upload',{
      name:'file',
      filePath:tempFiles[0].tempFilePath,
    })
    console.log(res);
    console.log(tempFiles[0].tempFilePath);
    this.setData({
      // idcardFrontUrl:res.data.url
      [type]:res.data.url  // 插值语法
    })
  }
})
