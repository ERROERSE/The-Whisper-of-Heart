//bx_apply.js
//获取应用实例
var app = getApp();
Page({
  remind: '加载中',
  data: {
    formData: {       //表单数据
      // Id: '',      //统一认证码
      Name: '',       //用户名
      Title: '',      //标题
      Content: '',    //报修内容
      father: '',
    },
    showError: false,
    disabled: false
  },
  onLoad: function () {
    // console.log(app.globalData)

    wx.getUserInfo({
      success: res => {
        this.setData({
          'formData.Name': res.userInfo.nickName
          // userInfo: res.userInfo
        })
      },
      fail: err => {
        this.setData({
          'formData.Name': '游客'
          // userInfo: res.userInfo
        })
      }
    });

  },

  listenerTitle: function (e) {
    this.setData({
      'formData.Title': e.detail.value
    });
  },

  listenerTextarea: function (e) {
    this.setData({
      'formData.Content': e.detail.value
    });
  },

  submitApply: function (e) {
    this.setData({
      'disabled': true
    });
    // console.log(formData.Content.value);

    // if (!formData.Content){
    //   console.log('0000');
    // }

    var _this = this,
      formData = _this.data.formData;
    _this.setData({
      showError: true
    });
    // 验证表单
    if ( !formData.Title || !formData.Content) {
      wx.showToast({
        icon: 'none',
        title: '表单不能为空'
      })
      return false;
    }
    const db = wx.cloud.database()
    var myDate = new Date();

   
    // console.log('mmm');

    console.log(formData.Name)

    db.collection('topic').add({
      data: {
        title: formData.Title,
        content: formData.Content,
        name: formData.Name,
        time: myDate.toLocaleString(),
        father: formData.father
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'fail',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      },
      complete: () => {
        this.setData({
          'disabled': false
        })
      }
    }) ;


  }

  

});

