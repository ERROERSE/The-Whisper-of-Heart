// miniprogram/pages/inquiry/inquirydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {       //表单数据
      // Id: '',      //统一认证码
      Name: '',       //用户名
      Title: '',      //标题
      Content: '',    //报修内容
      father: '',
    },
    'question': '',
    'answer': [],
    qid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      qid: options.qid
    })
    console.log('qid：', this.data.qid)

    const db = wx.cloud.database()

    db.collection('topic').where({
      _id: options.qid
      }).get({
      success: res => {
        this.setData({
          'question': res.data
        })
        console.log('[数据库topic] [查询题目] 成功: ', this.data.active.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库topic] [查询题目] 失败：', err)
      }
    })

    db.collection('topic').where({
      father: options.qid
    }).get({
      success: res => {
        this.setData({
          'answer': res.data
        })
        console.log('[数据库topic] [查询回答] 成功: ', this.data.active.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库topic] [查询回答] 失败：', err)
      }
    })



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

    console.log('qid: ', this.data.qid)

    db.collection('topic').add({
      data: {
        title: formData.Title,
        content: formData.Content,
        name: formData.Name,
        time: myDate.toLocaleString(),
        father: _this.data.qid
      },
      success: res => {
        wx.showToast({
          title: '新增回答成功',
        })
        console.log('[topic] [新增回答] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'fail',
          title: '新增记录失败'
        })
        console.error('[topic] [新增回答] 失败：', err)
      },
      complete: () => {
        this.setData({
          'disabled': false
        })
      }
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})