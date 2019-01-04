// miniprogram/pages/register/register.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {             //表单数据
      openid: '',         //统一认证码
      Name: '',       //用户名
      CardID: '',      //身份证号
      Mobile: '',     //手机号
      CredID:'',     //职业证号
      Content:'',        //备注
      fileID:'',  //文件ID
      filePath: ''
    },
    disabled: false
    },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  listenerCardID: function (e) {
    this.setData({
      'formData.CardID': e.detail.value
    });
  },

  listenerMobile: function (e) {
    this.setData({
      'formData.Mobile': e.detail.value
    });
  },

  listenerCredID: function (e) {
    this.setData({
      'formData.CredID': e.detail.value
    });
  },

  listenerName: function (e) {
    this.setData({
      'formData.Name': e.detail.value
    });
  },

  listenerTextarea: function (e) {
    this.setData({
      'formData.Content': e.detail.value
    });
  },

    // 选择图片函数
  doUpload: function () {
      var that = this
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // console.log(this.formData)
          // this.filePath = res.tempFilePaths[0]
          that.setData({
            'formData.filePath': res.tempFilePaths[0]
          });
          wx.showToast({
            title: '选择图片成功',
          })
        },
        fail: e => {
          console.error(e)
        }
      })
    },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  submitApply: function (e) {
    this.setData({
      disabled: true,
    })
    this.onGetOpenid();
    this.setData({
      'formData.openid': app.globalData.openid
    })
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
    if (!formData.Name) {
      wx.showToast({
        icon: 'none',
        title: '姓名不能为空'
      })
      return false;
    }
    if (!formData.CardID) {
      wx.showToast({
        icon: 'none',
        title: '身份证号不能为空'
      })
      return false;
    }
    if (!formData.Mobile) {
      wx.showToast({
        icon: 'none',
        title: '手机号不能为空'
      })
      return false;
    }
    if (!formData.CredID) {
      wx.showToast({
        icon: 'none',
        title: '执业证号不能为空'
      })
      return false;
    }
    if (!formData.filePath) {
      wx.showToast({
        icon: 'none',
        title: '所选图片不能为空'
      })
      return false;
    }

    const db = wx.cloud.database();
    // console.log('mmm');

    // console.log(formData.Name);

    // 上传图片
    const filePath = this.data.formData.filePath
    // console.log(filePath)
    const cloudPath = 'apply-image' + filePath.match(/\.[^.]+?$/)[0]

    var that = this,
    data = that.data

    wx.showLoading({title: '上传中'});
    
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)
        that.setData({
          'formData.fileID': res.fileID
          // userInfo: res.userInfo
        })
        console.log('data', that.data.formData)
        wx.showToast({
          title: '上传图片成功',
        })

        db.collection('apply').add({
          data: {
            openid: formData.openid,
            name: formData.Name,
            CardID: formData.CardID,
            Mobile: formData.Mobile,
            CredID: formData.CredID,
            fileID: formData.fileID,
            formData: formData.formData
          },
          success: res => {
            wx.showToast({
              title: '新增记录成功',
            }),
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'fail',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        });

        // wx.hideLoading()
        // app.globalData.fileID = res.fileID
        // app.globalData.cloudPath = cloudPath
        // app.globalData.imagePath = filePath

        // wx.navigateTo({
        //   url: '../storageConsole/storageConsole'
        // })
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '文件上传失败',
        })
        wx.hideLoading()
        return false;
      },
      complete: () => {
        wx.hideLoading(),
          // wx.navigateTo({
          //   url: '../userpage/userpage'
          // })

          wx.navigateBack({
            delta: 1
          })
      }
    })
    // console.log('data', this.data.formData)
    this.setData({
      disabled: false,
    })
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