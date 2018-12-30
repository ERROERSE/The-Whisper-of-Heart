//app.js
App({

  globalData:{
    'inform':'', //用来获取云函数返回的信息并传至下一个页面使用
    'testIndex': 1
  },

  isDoc: false,
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      'sclResult':[]
    }
  },
    getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      console.log('这里是空的')
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.encryptedData = res.encryptedData;
              that.globalData.iv = res.iv;
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
})
